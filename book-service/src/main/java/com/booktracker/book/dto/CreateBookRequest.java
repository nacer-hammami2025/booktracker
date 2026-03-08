package com.booktracker.book.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

/**
 * DTO pour créer un livre
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookRequest {

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 500)
    private String title;

    @Size(max = 13)
    private String isbn;

    @Size(max = 1000)
    private String description;

    private LocalDate publishedDate;

    private Integer pageCount;

    private String language;

    private String thumbnailUrl;

    private Set<String> authors;

    private Set<String> genres;
}
