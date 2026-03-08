package com.booktracker.tracker.repository;

import com.booktracker.tracker.domain.ReadingStatus;
import com.booktracker.tracker.domain.UserBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour UserBook
 */
@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Long> {

    Optional<UserBook> findByUserIdAndBookId(Long userId, Long bookId);

    Page<UserBook> findByUserIdAndStatus(Long userId, ReadingStatus status, Pageable pageable);

    List<UserBook> findByUserIdAndStatus(Long userId, ReadingStatus status);

    Page<UserBook> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    List<UserBook> findByUserIdAndIsFavoriteTrue(Long userId);

    long countByUserIdAndStatus(Long userId, ReadingStatus status);

    boolean existsByUserIdAndBookId(Long userId, Long bookId);
}
