package com.booktracker.reco.controller;

import com.booktracker.reco.dto.BookDTO;
import com.booktracker.reco.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour les recommandations
 */
@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    /**
     * Obtenir des recommandations personnalisées
     */
    @GetMapping
    public ResponseEntity<List<BookDTO>> getRecommendations(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam(defaultValue = "10") int limit) {
        List<BookDTO> recommendations = recommendationService.getRecommendations(userId, limit);
        return ResponseEntity.ok(recommendations);
    }

    /**
     * Obtenir des livres similaires
     */
    @GetMapping("/similar/{bookId}")
    public ResponseEntity<List<BookDTO>> getSimilarBooks(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "10") int limit) {
        List<BookDTO> similarBooks = recommendationService.getSimilarBooks(bookId, limit);
        return ResponseEntity.ok(similarBooks);
    }
}
