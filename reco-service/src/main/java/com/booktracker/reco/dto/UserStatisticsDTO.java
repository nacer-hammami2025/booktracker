package com.booktracker.reco.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Map;

/**
 * DTO pour statistiques utilisateur (cacheable avec Redis)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStatisticsDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long userId;
    private Long totalBooksRead;
    private Long totalBooksReading;
    private Long totalBooksToRead;
    private Long totalBooksAbandoned;
    private Integer totalPagesRead;
    private Long totalReviews;
    private Double averageRating;
    
    // Genres préférés (nom du genre -> nombre de livres)
    private Map<String, Long> favoriteGenres;
    
    // Statistiques de lecture par mois (pour graphiques)
    private Map<String, Long> booksPerMonth;
    
    // Objectif de l'année
    private ReadingGoalDTO currentYearGoal;
}
