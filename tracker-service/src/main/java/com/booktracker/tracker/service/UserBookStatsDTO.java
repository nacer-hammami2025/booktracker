package com.booktracker.tracker.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour les statistiques utilisateur
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserBookStatsDTO {
    private Long toRead;
    private Long reading;
    private Long finished;
    private Long abandoned;
    private Long total;
}
