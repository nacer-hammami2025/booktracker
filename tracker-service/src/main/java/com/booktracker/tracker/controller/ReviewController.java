package com.booktracker.tracker.controller;

import com.booktracker.tracker.dto.CreateReviewRequest;
import com.booktracker.tracker.dto.ReviewDTO;
import com.booktracker.tracker.service.BookRatingDTO;
import com.booktracker.tracker.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Contrôleur REST pour gérer les critiques
 */
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    /**
     * Créer ou mettre à jour une critique
     */
    @PostMapping
    public ResponseEntity<ReviewDTO> createOrUpdateReview(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody CreateReviewRequest request) {
        ReviewDTO result = reviewService.createOrUpdateReview(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    /**
     * Obtenir la critique d'un utilisateur pour un livre
     */
    @GetMapping("/book/{bookId}/user")
    public ResponseEntity<ReviewDTO> getUserReview(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long bookId) {
        ReviewDTO review = reviewService.getUserReview(userId, bookId);
        if (review == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(review);
    }

    /**
     * Obtenir toutes les critiques d'un livre
     */
    @GetMapping("/book/{bookId}")
    public ResponseEntity<Page<ReviewDTO>> getBookReviews(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ReviewDTO> reviews = reviewService.getBookReviews(bookId, pageable);
        return ResponseEntity.ok(reviews);
    }

    /**
     * Obtenir la note moyenne d'un livre
     */
    @GetMapping("/book/{bookId}/rating")
    public ResponseEntity<BookRatingDTO> getBookRating(@PathVariable Long bookId) {
        BookRatingDTO rating = reviewService.getBookRating(bookId);
        return ResponseEntity.ok(rating);
    }

    /**
     * Supprimer une critique
     */
    @DeleteMapping("/book/{bookId}")
    public ResponseEntity<Void> deleteReview(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long bookId) {
        reviewService.deleteReview(userId, bookId);
        return ResponseEntity.noContent().build();
    }
}
