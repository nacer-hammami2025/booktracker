package com.booktracker.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * DTO pour ReadingList
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadingListDTO {
    private Long id;
    private Long userId;
    private String name;
    private String description;
    private Set<Long> bookIds;
    private Integer bookCount;
}
