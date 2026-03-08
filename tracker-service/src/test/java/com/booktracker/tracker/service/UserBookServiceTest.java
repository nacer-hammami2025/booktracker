package com.booktracker.tracker.service;

import com.booktracker.tracker.client.BookServiceClient;
import com.booktracker.tracker.domain.ReadingStatus;
import com.booktracker.tracker.domain.UserBook;
import com.booktracker.tracker.dto.AddBookRequest;
import com.booktracker.tracker.dto.BookInfoDTO;
import com.booktracker.tracker.dto.UserBookDTO;
import com.booktracker.tracker.repository.UserBookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

/**
 * Tests unitaires pour UserBookService
 */
@ExtendWith(MockitoExtension.class)
class UserBookServiceTest {

    @Mock
    private UserBookRepository userBookRepository;

    @Mock
    private BookServiceClient bookServiceClient;

    @InjectMocks
    private UserBookService userBookService;

    private UserBook testUserBook;
    private BookInfoDTO testBookInfo;

    @BeforeEach
    void setUp() {
        testBookInfo = BookInfoDTO.builder()
                .id(1L)
                .title("Test Book")
                .thumbnailUrl("http://example.com/cover.jpg")
                .pageCount(300)
                .build();

        testUserBook = new UserBook();
        testUserBook.setId(1L);
        testUserBook.setUserId(100L);
        testUserBook.setBookId(1L);
        testUserBook.setStatus(ReadingStatus.READING);
        testUserBook.setCurrentPage(150);
        testUserBook.setStartDate(LocalDate.now().minusDays(7));
        testUserBook.setIsFavorite(false);
    }

    @Test
    void addBook_WhenBookNotInLibrary_ShouldAddBook() {
        // Given
        AddBookRequest request = AddBookRequest.builder()
                .bookId(1L)
                .status(ReadingStatus.TO_READ)
                .currentPage(0)
                .isFavorite(false)
                .build();

        when(userBookRepository.existsByUserIdAndBookId(100L, 1L)).thenReturn(false);
        when(bookServiceClient.getBookById(1L)).thenReturn(testBookInfo);
        when(userBookRepository.save(any(UserBook.class))).thenAnswer(i -> {
            UserBook book = i.getArgument(0);
            book.setId(1L);
            return book;
        });

        // When
        UserBookDTO result = userBookService.addBook(100L, request);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getBookId()).isEqualTo(1L);
        assertThat(result.getStatus()).isEqualTo(ReadingStatus.TO_READ);
        verify(userBookRepository).save(any(UserBook.class));
    }

    @Test
    void addBook_WhenBookAlreadyExists_ShouldThrowException() {
        // Given
        AddBookRequest request = AddBookRequest.builder()
                .bookId(1L)
                .status(ReadingStatus.TO_READ)
                .build();

        when(userBookRepository.existsByUserIdAndBookId(100L, 1L)).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> userBookService.addBook(100L, request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Ce livre existe déjà dans votre bibliothèque");
    }

    @Test
    void updateProgress_WhenBookInLibrary_ShouldUpdateProgress() {
        // Given
        when(userBookRepository.findByUserIdAndBookId(100L, 1L))
                .thenReturn(Optional.of(testUserBook));
        when(bookServiceClient.getBookById(1L)).thenReturn(testBookInfo);
        when(userBookRepository.save(any(UserBook.class))).thenAnswer(i -> i.getArguments()[0]);

        // When
        UserBookDTO result = userBookService.updateProgress(100L, 1L, 200);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getCurrentPage()).isEqualTo(200);
        verify(userBookRepository).save(any(UserBook.class));
    }

    @Test
    void updateProgress_WhenFinished_ShouldChangeStatus() {
        // Given
        when(userBookRepository.findByUserIdAndBookId(100L, 1L))
                .thenReturn(Optional.of(testUserBook));
        when(bookServiceClient.getBookById(1L)).thenReturn(testBookInfo);
        when(userBookRepository.save(any(UserBook.class))).thenAnswer(i -> i.getArguments()[0]);

        // When - Read beyond total pages
        UserBookDTO result = userBookService.updateProgress(100L, 1L, 300);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getStatus()).isEqualTo(ReadingStatus.FINISHED);
        assertThat(result.getFinishDate()).isNotNull();
    }

    @Test
    void updateStatus_ShouldChangeStatus() {
        // Given
        testUserBook.setStatus(ReadingStatus.TO_READ);
        when(userBookRepository.findByUserIdAndBookId(100L, 1L))
                .thenReturn(Optional.of(testUserBook));
        when(bookServiceClient.getBookById(1L)).thenReturn(testBookInfo);
        when(userBookRepository.save(any(UserBook.class))).thenAnswer(i -> i.getArguments()[0]);

        // When
        UserBookDTO result = userBookService.updateStatus(100L, 1L, ReadingStatus.READING);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getStatus()).isEqualTo(ReadingStatus.READING);
        assertThat(result.getStartDate()).isNotNull();
    }

    @Test
    void toggleFavorite_ShouldToggleFavoriteStatus() {
        // Given
        testUserBook.setIsFavorite(false);
        when(userBookRepository.findByUserIdAndBookId(100L, 1L))
                .thenReturn(Optional.of(testUserBook));
        when(bookServiceClient.getBookById(1L)).thenReturn(testBookInfo);
        when(userBookRepository.save(any(UserBook.class))).thenAnswer(i -> i.getArguments()[0]);

        // When
        UserBookDTO result = userBookService.toggleFavorite(100L, 1L);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getIsFavorite()).isTrue();
    }

    @Test
    void removeBook_WhenBookExists_ShouldRemoveBook() {
        // Given
        when(userBookRepository.findByUserIdAndBookId(100L, 1L))
                .thenReturn(Optional.of(testUserBook));
        doNothing().when(userBookRepository).delete(any(UserBook.class));

        // When
        userBookService.removeBook(100L, 1L);

        // Then
        verify(userBookRepository).delete(testUserBook);
    }

    @Test
    void getStats_ShouldReturnCorrectStatistics() {
        // Given
        when(userBookRepository.countByUserIdAndStatus(100L, ReadingStatus.TO_READ)).thenReturn(5L);
        when(userBookRepository.countByUserIdAndStatus(100L, ReadingStatus.READING)).thenReturn(3L);
        when(userBookRepository.countByUserIdAndStatus(100L, ReadingStatus.FINISHED)).thenReturn(20L);
        when(userBookRepository.countByUserIdAndStatus(100L, ReadingStatus.ABANDONED)).thenReturn(2L);

        // When
        UserBookStatsDTO result = userBookService.getStats(100L);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getToRead()).isEqualTo(5L);
        assertThat(result.getReading()).isEqualTo(3L);
        assertThat(result.getFinished()).isEqualTo(20L);
        assertThat(result.getAbandoned()).isEqualTo(2L);
        assertThat(result.getTotal()).isEqualTo(30L);
    }
}
