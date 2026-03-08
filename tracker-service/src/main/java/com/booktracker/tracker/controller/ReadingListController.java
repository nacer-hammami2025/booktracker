package com.booktracker.tracker.controller;

import com.booktracker.tracker.dto.CreateListRequest;
import com.booktracker.tracker.dto.ReadingListDTO;
import com.booktracker.tracker.service.ReadingListService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour gérer les listes de lecture
 */
@RestController
@RequestMapping("/api/reading-lists")
@RequiredArgsConstructor
public class ReadingListController {

    private final ReadingListService readingListService;

    /**
     * Créer une nouvelle liste
     */
    @PostMapping
    public ResponseEntity<ReadingListDTO> createList(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody CreateListRequest request) {
        ReadingListDTO result = readingListService.createList(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    /**
     * Obtenir toutes les listes de l'utilisateur
     */
    @GetMapping
    public ResponseEntity<List<ReadingListDTO>> getUserLists(
            @RequestHeader("X-User-Id") Long userId) {
        List<ReadingListDTO> lists = readingListService.getUserLists(userId);
        return ResponseEntity.ok(lists);
    }

    /**
     * Obtenir une liste par ID
     */
    @GetMapping("/{listId}")
    public ResponseEntity<ReadingListDTO> getListById(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long listId) {
        ReadingListDTO list = readingListService.getListById(userId, listId);
        return ResponseEntity.ok(list);
    }

    /**
     * Mettre à jour une liste
     */
    @PutMapping("/{listId}")
    public ResponseEntity<ReadingListDTO> updateList(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long listId,
            @Valid @RequestBody CreateListRequest request) {
        ReadingListDTO result = readingListService.updateList(userId, listId, request);
        return ResponseEntity.ok(result);
    }

    /**
     * Ajouter un livre à une liste
     */
    @PostMapping("/{listId}/books/{bookId}")
    public ResponseEntity<ReadingListDTO> addBookToList(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long listId,
            @PathVariable Long bookId) {
        ReadingListDTO result = readingListService.addBookToList(userId, listId, bookId);
        return ResponseEntity.ok(result);
    }

    /**
     * Retirer un livre d'une liste
     */
    @DeleteMapping("/{listId}/books/{bookId}")
    public ResponseEntity<ReadingListDTO> removeBookFromList(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long listId,
            @PathVariable Long bookId) {
        ReadingListDTO result = readingListService.removeBookFromList(userId, listId, bookId);
        return ResponseEntity.ok(result);
    }

    /**
     * Supprimer une liste
     */
    @DeleteMapping("/{listId}")
    public ResponseEntity<Void> deleteList(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long listId) {
        readingListService.deleteList(userId, listId);
        return ResponseEntity.noContent().build();
    }
}
