package com.booktracker.tracker.controller;

import com.booktracker.tracker.domain.ReadingStatus;
import com.booktracker.tracker.dto.AddBookRequest;
import com.booktracker.tracker.dto.UserBookDTO;
import com.booktracker.tracker.service.UserBookService;
import com.booktracker.tracker.service.UserBookStatsDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour gérer les livres utilisateur
 */
@RestController
@RequestMapping("/api/user-books")
@RequiredArgsConstructor
public class UserBookController {

    private final UserBookService userBookService;

    /**
     * Ajouter un livre à la bibliothèque
     */
    @PostMapping
    public ResponseEntity<UserBookDTO> addBook(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody AddBookRequest request) {
        UserBookDTO result = userBookService.addBook(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    /**
     * Obtenir tous les livres de l'utilisateur
     */
    @GetMapping
    public ResponseEntity<Page<UserBookDTO>> getUserBooks(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {
        
        Sort.Direction sortDirection = direction.equalsIgnoreCase("ASC") ? 
                Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        Page<UserBookDTO> result = userBookService.getUserBooks(userId, pageable);
        return ResponseEntity.ok(result);
    }

    /**
     * Obtenir les livres par statut
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<UserBookDTO>> getBooksByStatus(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable ReadingStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<UserBookDTO> result = userBookService.getBooksByStatus(userId, status, pageable);
        return ResponseEntity.ok(result);
    }

    /**
     * Obtenir tous les livres par statut (sans pagination)
     * Endpoint dédié pour le service de recommandations
     */
    @GetMapping("/list/status/{status}")
    public ResponseEntity<List<UserBookDTO>> getAllBooksByStatus(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable ReadingStatus status) {
        
        List<UserBookDTO> result = userBookService.getAllBooksByStatus(userId, status);
        return ResponseEntity.ok(result);
    }

    /**
     * Obtenir les favoris
     */
    @GetMapping("/favorites")
    public ResponseEntity<List<UserBookDTO>> getFavorites(
            @RequestHeader("X-User-Id") Long userId) {
        List<UserBookDTO> favorites = userBookService.getFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    /**
     * Obtenir un livre utilisateur spécifique par bookId
     */
    @GetMapping("/book/{bookId}")
    public ResponseEntity<UserBookDTO> getUserBookByBookId(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long bookId) {
        UserBookDTO userBook = userBookService.getUserBookByBookId(userId, bookId);
        if (userBook == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userBook);
    }

    /**
     * Mettre à jour la progression
     */
    @PutMapping("/{bookId}/progress")
    public ResponseEntity<UserBookDTO> updateProgress(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long bookId,
            @RequestParam Integer currentPage) {
        UserBookDTO result = userBookService.updateProgress(userId, bookId, currentPage);
        return ResponseEntity.ok(result);
    }

    /**
     * Changer le statut
     */
    @PutMapping("/{bookId}/status")
    public ResponseEntity<UserBookDTO> updateStatus(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long bookId,
            @RequestParam ReadingStatus status) {
        UserBookDTO result = userBookService.updateStatus(userId, bookId, status);
        return ResponseEntity.ok(result);
    }

    /**
     * Ajouter/retirer des favoris
     */
    @PutMapping("/{bookId}/favorite")
    public ResponseEntity<UserBookDTO> toggleFavorite(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long bookId) {
        UserBookDTO result = userBookService.toggleFavorite(userId, bookId);
        return ResponseEntity.ok(result);
    }

    /**
     * Supprimer un livre
     */
    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> removeBook(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long bookId) {
        userBookService.removeBook(userId, bookId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Obtenir les statistiques
     */
    @GetMapping("/stats")
    public ResponseEntity<UserBookStatsDTO> getStats(
            @RequestHeader("X-User-Id") Long userId) {
        UserBookStatsDTO stats = userBookService.getStats(userId);
        return ResponseEntity.ok(stats);
    }
}
