package com.booktracker.tracker.dto;

import com.booktracker.tracker.domain.ReadingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO pour UserBook
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserBookDTO {
    private Long id;
    private Long userId;
    private Long bookId;
    private ReadingStatus status;
    private Integer currentPage;
    private LocalDate startDate;
    private LocalDate finishDate;
    private Boolean isFavorite;
    private Double progressPercentage;
    
    // Info du livre (depuis Book Service)
    private String bookTitle;
    private String bookThumbnail;
    private Integer bookPageCount;
}
