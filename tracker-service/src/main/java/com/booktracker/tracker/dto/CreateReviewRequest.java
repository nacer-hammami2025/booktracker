package com.booktracker.tracker.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Requête pour créer une critique
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateReviewRequest {

    @NotNull(message = "L'ID du livre est obligatoire")
    private Long bookId;

    @NotNull(message = "La note est obligatoire")
    @Min(value = 1, message = "La note minimale est 1")
    @Max(value = 5, message = "La note maximale est 5")
    private Integer rating;

    @Size(max = 2000, message = "Le contenu ne peut pas dépasser 2000 caractères")
    private String content;

    @Size(max = 500, message = "La citation ne peut pas dépasser 500 caractères")
    private String quote;
}
