package com.booktracker.book.service;

import com.booktracker.book.domain.Author;
import com.booktracker.book.domain.Book;
import com.booktracker.book.domain.Genre;
import com.booktracker.book.dto.BookDTO;
import com.booktracker.book.dto.CreateBookRequest;
import com.booktracker.book.dto.PageResponse;
import com.booktracker.book.repository.AuthorRepository;
import com.booktracker.book.repository.BookRepository;
import com.booktracker.book.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service de gestion des livres
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    /**
     * Rechercher des livres par mot-clé
     */
    @Transactional(readOnly = true)
    public PageResponse<BookDTO> searchBooks(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("title"));
        Page<Book> bookPage = bookRepository.searchByKeyword(keyword, pageable);
        
        return mapToPageResponse(bookPage);
    }

    /**
     * Obtenir tous les livres
     */
    @Transactional(readOnly = true)
    public PageResponse<BookDTO> getAllBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> bookPage = bookRepository.findAll(pageable);
        
        return mapToPageResponse(bookPage);
    }

    /**
     * Obtenir un livre par ID
     */
    @Transactional(readOnly = true)
    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé: " + id));
        return mapToDTO(book);
    }

    /**
     * Créer un nouveau livre
     */
    @Transactional
    public BookDTO createBook(CreateBookRequest request) {
        log.info("Création d'un nouveau livre: {}", request.getTitle());

        Book book = Book.builder()
                .title(request.getTitle())
                .isbn(request.getIsbn())
                .description(request.getDescription())
                .publishedDate(request.getPublishedDate())
                .pageCount(request.getPageCount())
                .language(request.getLanguage())
                .thumbnailUrl(request.getThumbnailUrl())
                .build();

        // Ajouter les auteurs
        final Book finalBook = book;
        if (request.getAuthors() != null) {
            request.getAuthors().forEach(authorName -> {
                Author author = authorRepository.findByName(authorName)
                        .orElseGet(() -> authorRepository.save(Author.builder().name(authorName).build()));
                finalBook.addAuthor(author);
            });
        }

        // Ajouter les genres
        if (request.getGenres() != null) {
            request.getGenres().forEach(genreName -> {
                Genre genre = genreRepository.findByName(genreName)
                        .orElseGet(() -> genreRepository.save(Genre.builder().name(genreName).build()));
                finalBook.addGenre(genre);
            });
        }

        book = bookRepository.save(book);
        log.info("Livre créé avec succès: ID={}", book.getId());

        return mapToDTO(book);
    }

    /**
     * Mettre à jour un livre
     */
    @Transactional
    public BookDTO updateBook(Long id, CreateBookRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé: " + id));

        book.setTitle(request.getTitle());
        book.setIsbn(request.getIsbn());
        book.setDescription(request.getDescription());
        book.setPublishedDate(request.getPublishedDate());
        book.setPageCount(request.getPageCount());
        book.setLanguage(request.getLanguage());
        book.setThumbnailUrl(request.getThumbnailUrl());

        book = bookRepository.save(book);
        return mapToDTO(book);
    }

    /**
     * Supprimer un livre
     */
    @Transactional
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Livre non trouvé: " + id);
        }
        bookRepository.deleteById(id);
        log.info("Livre supprimé: ID={}", id);
    }

    /**
     * Obtenir les livres par genre
     */
    @Transactional(readOnly = true)
    public PageResponse<BookDTO> getBooksByGenre(String genreName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> bookPage = bookRepository.findByGenreName(genreName, pageable);
        
        return mapToPageResponse(bookPage);
    }

    /**
     * Obtenir tous les livres par genre (sans pagination)
     * Utilisé par le service de recommandations
     */
    @Transactional(readOnly = true)
    public List<BookDTO> getAllBooksByGenre(String genreName, int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<Book> bookPage = bookRepository.findByGenreName(genreName, pageable);
        
        return bookPage.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtenir tous les livres (sans pagination)
     * Utilisé par le service de recommandations
     */
    @Transactional(readOnly = true)
    public List<BookDTO> getAllBooksAsList(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<Book> bookPage = bookRepository.findAll(pageable);
        
        return bookPage.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Helper methods
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

    private PageResponse<BookDTO> mapToPageResponse(Page<Book> bookPage) {
        return PageResponse.<BookDTO>builder()
                .content(bookPage.getContent().stream().map(this::mapToDTO).collect(Collectors.toList()))
                .page(bookPage.getNumber())
                .size(bookPage.getSize())
                .totalElements(bookPage.getTotalElements())
                .totalPages(bookPage.getTotalPages())
                .last(bookPage.isLast())
                .build();
    }
}
