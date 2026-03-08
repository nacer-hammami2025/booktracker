package com.booktracker.tracker.repository;

import com.booktracker.tracker.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour Review
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByUserIdAndBookId(Long userId, Long bookId);

    Page<Review> findByBookIdOrderByCreatedAtDesc(Long bookId, Pageable pageable);

    List<Review> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.bookId = :bookId")
    Double getAverageRatingForBook(Long bookId);

    long countByBookId(Long bookId);
}
