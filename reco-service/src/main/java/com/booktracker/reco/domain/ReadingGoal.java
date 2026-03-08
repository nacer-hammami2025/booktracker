package com.booktracker.reco.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Objectif de lecture utilisateur
 */
@Entity
@Table(name = "reading_goals")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadingGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Integer targetBooks;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer currentProgress;

    private LocalDate createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDate.now();
    }

    /**
     * Calculer le pourcentage de progression
     */
    public Double getProgressPercentage() {
        if (targetBooks == null || targetBooks == 0) {
            return 0.0;
        }
        return (currentProgress * 100.0) / targetBooks;
    }

    /**
     * Vérifier si l'objectif est atteint
     */
    public boolean isAchieved() {
        return currentProgress >= targetBooks;
    }
}
