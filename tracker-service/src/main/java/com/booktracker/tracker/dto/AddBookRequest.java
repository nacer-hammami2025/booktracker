package com.booktracker.tracker.dto;

import com.booktracker.tracker.domain.ReadingStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Requête pour ajouter un livre
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddBookRequest {

    @NotNull(message = "L'ID du livre est obligatoire")
    private Long bookId;

    @NotNull(message = "Le statut est obligatoire")
    private ReadingStatus status;

    @Min(value = 0, message = "La page actuelle doit être positive")
    private Integer currentPage;

    private LocalDate startDate;

    private Boolean isFavorite;
}
