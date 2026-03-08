package com.booktracker.tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Requête pour créer une liste
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateListRequest {

    @NotBlank(message = "Le nom de la liste est obligatoire")
    @Size(max = 200, message = "Le nom ne peut pas dépasser 200 caractères")
    private String name;

    @Size(max = 500, message = "La description ne peut pas dépasser 500 caractères")
    private String description;
}
