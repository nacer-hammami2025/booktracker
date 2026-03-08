package com.booktracker.book.service;

import com.booktracker.book.domain.Author;
import com.booktracker.book.domain.Book;
import com.booktracker.book.domain.Genre;
import com.booktracker.book.dto.BookDTO;
import com.booktracker.book.dto.CreateBookRequest;
import com.booktracker.book.repository.AuthorRepository;
import com.booktracker.book.repository.BookRepository;
import com.booktracker.book.repository.GenreRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Tests unitaires pour BookService
 */
@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private GenreRepository genreRepository;

    @InjectMocks
    private BookService bookService;

    private Book testBook;
    private Author testAuthor;
    private Genre testGenre;

    @BeforeEach
    void setUp() {
        testAuthor = new Author();
        testAuthor.setId(1L);
        testAuthor.setName("J.K. Rowling");

        testGenre = new Genre();
        testGenre.setId(1L);
        testGenre.setName("Fantasy");

        testBook = new Book();
        testBook.setId(1L);
        testBook.setTitle("Harry Potter and the Philosopher's Stone");
        testBook.setIsbn("9780747532699");
        testBook.setDescription("A young wizard's journey begins");
        testBook.setPublishedDate(LocalDate.of(1997, 6, 26));
        testBook.setPageCount(223);
        testBook.setAuthors(new HashSet<>(Set.of(testAuthor)));
        testBook.setGenres(new HashSet<>(Set.of(testGenre)));
    }

    @Test
    void getAllBooks_ShouldReturnPagedBooks() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);
        List<Book> books = List.of(testBook);
        Page<Book> bookPage = new PageImpl<>(books, pageable, 1);

        when(bookRepository.findAll(any(Pageable.class))).thenReturn(bookPage);

        // When
        var result = bookService.getAllBooks(0, 10);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getTitle()).isEqualTo("Harry Potter and the Philosopher's Stone");
        verify(bookRepository).findAll(any(Pageable.class));
    }

    @Test
    void getBookById_WhenBookExists_ShouldReturnBook() {
        // Given
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));

        // When
        BookDTO result = bookService.getBookById(1L);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Harry Potter and the Philosopher's Stone");
        assertThat(result.getAuthors()).contains("J.K. Rowling");
        assertThat(result.getGenres()).contains("Fantasy");
    }

    @Test
    void getBookById_WhenBookNotFound_ShouldThrowException() {
        // Given
        when(bookRepository.findById(999L)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> bookService.getBookById(999L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Livre non trouvé");
    }

    @Test
    void createBook_WithNewAuthorsAndGenres_ShouldCreateBook() {
        // Given
        CreateBookRequest request = CreateBookRequest.builder()
                .title("New Book")
                .isbn("1234567890")
                .description("A new book")
                .publishedDate(LocalDate.now())
                .pageCount(300)
                .authors(Set.of("New Author"))
                .genres(Set.of("New Genre"))
                .build();

        when(authorRepository.findByName("New Author")).thenReturn(Optional.empty());
        when(authorRepository.save(any(Author.class))).thenAnswer(i -> i.getArguments()[0]);
        when(genreRepository.findByName("New Genre")).thenReturn(Optional.empty());
        when(genreRepository.save(any(Genre.class))).thenAnswer(i -> i.getArguments()[0]);
        when(bookRepository.save(any(Book.class))).thenAnswer(i -> {
            Book book = i.getArgument(0);
            book.setId(2L);
            return book;
        });

        // When
        BookDTO result = bookService.createBook(request);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getTitle()).isEqualTo("New Book");
        verify(authorRepository).save(any(Author.class));
        verify(genreRepository).save(any(Genre.class));
        verify(bookRepository).save(any(Book.class));
    }

    @Test
    void searchBooks_ShouldReturnMatchingBooks() {
        // Given
        String query = "Harry Potter";
        Pageable pageable = PageRequest.of(0, 10);
        List<Book> books = List.of(testBook);
        Page<Book> bookPage = new PageImpl<>(books, pageable, 1);

        when(bookRepository.searchByKeyword(eq(query), any(Pageable.class))).thenReturn(bookPage);

        // When
        var result = bookService.searchBooks(query, 0, 10);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getTitle()).contains("Harry Potter");
        verify(bookRepository).searchByKeyword(eq(query), any(Pageable.class));
    }

    @Test
    void updateBook_WhenBookExists_ShouldUpdateBook() {
        // Given
        CreateBookRequest request = CreateBookRequest.builder()
                .title("Updated Title")
                .isbn("9780747532699")
                .description("Updated description")
                .publishedDate(LocalDate.of(1997, 6, 26))
                .pageCount(250)
                .authors(Set.of("J.K. Rowling"))
                .genres(Set.of("Fantasy"))
                .build();

        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));
        when(authorRepository.findByName(anyString())).thenReturn(Optional.of(testAuthor));
        when(genreRepository.findByName(anyString())).thenReturn(Optional.of(testGenre));
        when(bookRepository.save(any(Book.class))).thenAnswer(i -> i.getArguments()[0]);

        // When
        BookDTO result = bookService.updateBook(1L, request);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getTitle()).isEqualTo("Updated Title");
        assertThat(result.getPageCount()).isEqualTo(250);
        verify(bookRepository).save(any(Book.class));
    }

    @Test
    void deleteBook_WhenBookExists_ShouldDeleteBook() {
        // Given
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));
        doNothing().when(bookRepository).delete(any(Book.class));

        // When
        bookService.deleteBook(1L);

        // Then
        verify(bookRepository).delete(testBook);
    }

    @Test
    void getBooksByGenre_ShouldReturnBooksInGenre() {
        // Given
        String genreName = "Fantasy";
        Pageable pageable = PageRequest.of(0, 10);
        List<Book> books = List.of(testBook);
        Page<Book> bookPage = new PageImpl<>(books, pageable, 1);

        when(bookRepository.findByGenreName(eq(genreName), any(Pageable.class))).thenReturn(bookPage);

        // When
        var result = bookService.getBooksByGenre(genreName, 0, 10);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getGenres()).contains("Fantasy");
        verify(bookRepository).findByGenreName(eq(genreName), any(Pageable.class));
    }
}
