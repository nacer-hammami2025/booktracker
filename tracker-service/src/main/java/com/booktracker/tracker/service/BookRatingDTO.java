package com.booktracker.tracker.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la note moyenne d'un livre
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookRatingDTO {
    private Long bookId;
    private Double averageRating;
    private Long reviewCount;
}
