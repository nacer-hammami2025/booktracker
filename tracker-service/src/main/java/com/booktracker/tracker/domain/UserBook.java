package com.booktracker.tracker.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entité UserBook - Représente un livre dans la bibliothèque d'un utilisateur
 */
@Entity
@Table(name = "user_books", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "book_id"})
})
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "book_id", nullable = false)
    private Long bookId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ReadingStatus status;

    @Column(name = "current_page")
    private Integer currentPage;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "finish_date")
    private LocalDate finishDate;

    @Column(name = "is_favorite")
    private Boolean isFavorite;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Calculer le pourcentage de progression
     */
    public Double getProgressPercentage(Integer totalPages) {
        if (totalPages == null || totalPages == 0 || currentPage == null) {
            return 0.0;
        }
        return Math.min((currentPage.doubleValue() / totalPages) * 100, 100.0);
    }
}
