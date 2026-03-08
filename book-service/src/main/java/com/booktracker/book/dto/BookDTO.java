package com.booktracker.book.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

/**
 * DTO pour Book
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String isbn;
    private String description;
    private LocalDate publishedDate;
    private Integer pageCount;
    private String language;
    private String thumbnailUrl;
    private String googleBooksId;
    private Set<String> authors;
    private Set<String> genres;
}
