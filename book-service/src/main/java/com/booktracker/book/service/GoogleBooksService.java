package com.booktracker.book.service;

import com.booktracker.book.domain.Author;
import com.booktracker.book.domain.Book;
import com.booktracker.book.domain.Genre;
import com.booktracker.book.dto.BookDTO;
import com.booktracker.book.repository.AuthorRepository;
import com.booktracker.book.repository.BookRepository;
import com.booktracker.book.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service d'intégration avec Google Books API
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GoogleBooksService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${google.books.api.url}")
    private String googleBooksApiUrl;

    @Value("${google.books.api.key}")
    private String apiKey;

    /**
     * Rechercher des livres sur Google Books API
     */
    @SuppressWarnings("unchecked")
    public List<BookDTO> searchGoogleBooks(String query, int maxResults) {
        try {
            String url = String.format("%s/volumes?q=%s&maxResults=%d&key=%s",
                    googleBooksApiUrl, query, maxResults, apiKey);

            log.info("Recherche Google Books: {}", query);
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response == null || !response.containsKey("items")) {
                return Collections.emptyList();
            }

            List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");

            return items.stream()
                    .map(this::mapGoogleBookToDTO)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("Erreur lors de la recherche Google Books: {}", e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Importer un livre depuis Google Books
     */
    @Transactional
    public BookDTO importFromGoogleBooks(String googleBooksId) {
        try {
            // Vérifier si le livre existe déjà
            Optional<Book> existingBook = bookRepository.findByGoogleBooksId(googleBooksId);
            if (existingBook.isPresent()) {
                log.info("Livre déjà importé: {}", googleBooksId);
                return mapToDTO(existingBook.get());
            }

            String url = String.format("%s/volumes/%s?key=%s",
                    googleBooksApiUrl, googleBooksId, apiKey);

            log.info("Import depuis Google Books: {}", googleBooksId);
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response == null) {
                throw new RuntimeException("Livre non trouvé sur Google Books");
            }

            Book book = mapGoogleBookToEntity(response);
            book = bookRepository.save(book);

            log.info("Livre importé avec succès: ID={}", book.getId());
            return mapToDTO(book);

        } catch (Exception e) {
            log.error("Erreur lors de l'import Google Books: {}", e.getMessage());
            throw new RuntimeException("Erreur lors de l'import: " + e.getMessage());
        }
    }

    // Helper methods
    @SuppressWarnings("unchecked")
    private BookDTO mapGoogleBookToDTO(Map<String, Object> item) {
        Map<String, Object> volumeInfo = (Map<String, Object>) item.get("volumeInfo");

        Set<String> authors = new HashSet<>();
        if (volumeInfo.containsKey("authors")) {
            authors = new HashSet<>((List<String>) volumeInfo.get("authors"));
        }

        Set<String> genres = new HashSet<>();
        if (volumeInfo.containsKey("categories")) {
            genres = new HashSet<>((List<String>) volumeInfo.get("categories"));
        }

        String thumbnail = null;
        if (volumeInfo.containsKey("imageLinks")) {
            Map<String, String> imageLinks = (Map<String, String>) volumeInfo.get("imageLinks");
            thumbnail = imageLinks.getOrDefault("thumbnail", null);
        }

        LocalDate publishedDate = null;
        if (volumeInfo.containsKey("publishedDate")) {
            try {
                String dateStr = (String) volumeInfo.get("publishedDate");
                publishedDate = LocalDate.parse(dateStr, DateTimeFormatter.ISO_DATE);
            } catch (Exception e) {
                // Date parsing failed, leave as null
            }
        }

        return BookDTO.builder()
                .googleBooksId((String) item.get("id"))
                .title((String) volumeInfo.get("title"))
                .description((String) volumeInfo.get("description"))
                .publishedDate(publishedDate)
                .pageCount((Integer) volumeInfo.get("pageCount"))
                .language((String) volumeInfo.get("language"))
                .thumbnailUrl(thumbnail)
                .authors(authors)
                .genres(genres)
                .build();
    }

    @SuppressWarnings("unchecked")
    private Book mapGoogleBookToEntity(Map<String, Object> response) {
        Map<String, Object> volumeInfo = (Map<String, Object>) response.get("volumeInfo");

        Book book = Book.builder()
                .googleBooksId((String) response.get("id"))
                .title((String) volumeInfo.get("title"))
                .description((String) volumeInfo.get("description"))
                .pageCount((Integer) volumeInfo.get("pageCount"))
                .language((String) volumeInfo.get("language"))
                .build();

        // ISBN
        if (volumeInfo.containsKey("industryIdentifiers")) {
            List<Map<String, String>> identifiers = (List<Map<String, String>>) volumeInfo.get("industryIdentifiers");
            for (Map<String, String> identifier : identifiers) {
                if ("ISBN_13".equals(identifier.get("type"))) {
                    book.setIsbn(identifier.get("identifier"));
                    break;
                }
            }
        }

        // Published Date
        if (volumeInfo.containsKey("publishedDate")) {
            try {
                String dateStr = (String) volumeInfo.get("publishedDate");
                book.setPublishedDate(LocalDate.parse(dateStr, DateTimeFormatter.ISO_DATE));
            } catch (Exception e) {
                // Date parsing failed, leave as null
            }
        }

        // Thumbnail
        if (volumeInfo.containsKey("imageLinks")) {
            Map<String, String> imageLinks = (Map<String, String>) volumeInfo.get("imageLinks");
            book.setThumbnailUrl(imageLinks.getOrDefault("thumbnail", null));
        }

        // Authors
        if (volumeInfo.containsKey("authors")) {
            List<String> authorNames = (List<String>) volumeInfo.get("authors");
            authorNames.forEach(authorName -> {
                Author author = authorRepository.findByName(authorName)
                        .orElseGet(() -> authorRepository.save(Author.builder().name(authorName).build()));
                book.addAuthor(author);
            });
        }

        // Genres/Categories
        if (volumeInfo.containsKey("categories")) {
            List<String> genreNames = (List<String>) volumeInfo.get("categories");
            genreNames.forEach(genreName -> {
                Genre genre = genreRepository.findByName(genreName)
                        .orElseGet(() -> genreRepository.save(Genre.builder().name(genreName).build()));
                book.addGenre(genre);
            });
        }

        return book;
    }

    private BookDTO mapToDTO(Book book) {
        return BookDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .isbn(book.getIsbn())
                .description(book.getDescription())
                .publishedDate(book.getPublishedDate())
                .pageCount(book.getPageCount())
                .language(book.getLanguage())
                .thumbnailUrl(book.getThumbnailUrl())
                .googleBooksId(book.getGoogleBooksId())
                .authors(book.getAuthors().stream().map(Author::getName).collect(Collectors.toSet()))
                .genres(book.getGenres().stream().map(Genre::getName).collect(Collectors.toSet()))
                .build();
    }
}
