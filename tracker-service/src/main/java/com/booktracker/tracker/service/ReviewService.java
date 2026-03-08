package com.booktracker.tracker.service;

import com.booktracker.tracker.domain.Review;
import com.booktracker.tracker.dto.CreateReviewRequest;
import com.booktracker.tracker.dto.ReviewDTO;
import com.booktracker.tracker.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service pour gérer les critiques
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;

    /**
     * Créer ou mettre à jour une critique
     */
    public ReviewDTO createOrUpdateReview(Long userId, CreateReviewRequest request) {
        Review review = reviewRepository.findByUserIdAndBookId(userId, request.getBookId())
                .orElse(new Review());

        review.setUserId(userId);
        review.setBookId(request.getBookId());
        review.setRating(request.getRating());
        review.setContent(request.getContent());
        review.setQuote(request.getQuote());

        Review saved = reviewRepository.save(review);
        return mapToDTO(saved);
    }

    /**
     * Obtenir la critique d'un utilisateur pour un livre
     */
    @Transactional(readOnly = true)
    public ReviewDTO getUserReview(Long userId, Long bookId) {
        return reviewRepository.findByUserIdAndBookId(userId, bookId)
                .map(this::mapToDTO)
                .orElse(null);
    }

    /**
     * Obtenir toutes les critiques d'un livre
     */
    @Transactional(readOnly = true)
    public Page<ReviewDTO> getBookReviews(Long bookId, Pageable pageable) {
        Page<Review> reviews = reviewRepository.findByBookIdOrderByCreatedAtDesc(bookId, pageable);
        return reviews.map(this::mapToDTO);
    }

    /**
     * Obtenir la note moyenne d'un livre
     */
    @Transactional(readOnly = true)
    public BookRatingDTO getBookRating(Long bookId) {
        Double average = reviewRepository.getAverageRatingForBook(bookId);
        Long count = reviewRepository.countByBookId(bookId);

        return BookRatingDTO.builder()
                .bookId(bookId)
                .averageRating(average != null ? average : 0.0)
                .reviewCount(count)
                .build();
    }

    /**
     * Supprimer une critique
     */
    public void deleteReview(Long userId, Long bookId) {
        Review review = reviewRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new IllegalArgumentException("Critique non trouvée"));
        
        reviewRepository.delete(review);
    }

    /**
     * Mapper vers DTO
     */
    private ReviewDTO mapToDTO(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .userId(review.getUserId())
                .bookId(review.getBookId())
                .rating(review.getRating())
                .content(review.getContent())
                .quote(review.getQuote())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
