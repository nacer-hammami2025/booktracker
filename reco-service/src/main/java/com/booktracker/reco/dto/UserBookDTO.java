package com.booktracker.reco.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour UserBook (depuis Tracker Service)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserBookDTO {
    private Long id;
    private Long userId;
    private Long bookId;
    private String status;
    private Boolean isFavorite;
}
