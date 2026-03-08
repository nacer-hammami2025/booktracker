package com.booktracker.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO simplifié pour les infos de livre (depuis Book Service)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookInfoDTO {
    private Long id;
    private String title;
    private String thumbnailUrl;
    private Integer pageCount;
}
