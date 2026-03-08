package com.booktracker.reco.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * DTO simplifié pour livre (depuis Book Service)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String thumbnailUrl;
    private String description;
    private Set<String> genres;
    private Set<String> authors;
}
