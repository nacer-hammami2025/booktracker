package com.booktracker.reco.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour objectif de lecture
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadingGoalDTO {
    private Long id;
    private Long userId;
    private Integer targetBooks;
    private Integer year;
    private Integer currentProgress;
    private Double progressPercentage;
    private Boolean isAchieved;
}
