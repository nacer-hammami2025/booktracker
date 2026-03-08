package com.booktracker.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO pour Review
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long id;
    private Long userId;
    private Long bookId;
    private Integer rating;
    private String content;
    private String quote;
    private LocalDateTime createdAt;
    
    // Info utilisateur (optionnel)
    private String username;
    
    // Info livre
    private String bookTitle;
}
