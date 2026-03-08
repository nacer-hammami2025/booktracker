package com.booktracker.book.controller;

import com.booktracker.book.dto.BookDTO;
import com.booktracker.book.dto.CreateBookRequest;
import com.booktracker.book.dto.PageResponse;
import com.booktracker.book.service.BookService;
import com.booktracker.book.service.GoogleBooksService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur pour les livres
 */
@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Books", description = "API de gestion des livres")
public class BookController {

    private final BookService bookService;
    private final GoogleBooksService googleBooksService;

    /**
     * Rechercher des livres
     */
    @GetMapping("/search")
    @Operation(summary = "Rechercher des livres", description = "Recherche par titre ou auteur")
    public ResponseEntity<PageResponse<BookDTO>> searchBooks(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/books/search - Query: {}, Page: {}, Size: {}", query, page, size);
        PageResponse<BookDTO> response = bookService.searchBooks(query, page, size);
        return ResponseEntity.ok(response);
    }

    /**
     * Obtenir tous les livres
     */
    @GetMapping
    @Operation(summary = "Liste des livres", description = "Obtenir tous les livres paginés")
    public ResponseEntity<PageResponse<BookDTO>> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/books - Page: {}, Size: {}", page, size);
        PageResponse<BookDTO> response = bookService.getAllBooks(page, size);
        return ResponseEntity.ok(response);
    }

    /**
     * Obtenir tous les livres par genre (sans pagination)
     * Endpoint dédié pour le service de recommandations
     */
    @GetMapping("/list/genre/{genreName}")
    @Operation(summary = "Liste de livres par genre", description = "Obtenir une liste de livres d'un genre (sans pagination)")
    public ResponseEntity<List<BookDTO>> getAllBooksByGenre(
            @PathVariable String genreName,
            @RequestParam(defaultValue = "10") int limit) {
        log.info("GET /api/books/list/genre/{} (limit: {})", genreName, limit);
        List<BookDTO> books = bookService.getAllBooksByGenre(genreName, limit);
        return ResponseEntity.ok(books);
    }

    /**
     * Obtenir tous les livres (sans pagination)
     * Endpoint dédié pour le service de recommandations
     */
    @GetMapping("/list")
    @Operation(summary = "Liste de tous les livres", description = "Obtenir une liste de livres (sans pagination)")
    public ResponseEntity<List<BookDTO>> getAllBooksAsList(
            @RequestParam(defaultValue = "10") int limit) {
        log.info("GET /api/books/list (limit: {})", limit);
        List<BookDTO> books = bookService.getAllBooksAsList(limit);
        return ResponseEntity.ok(books);
    }

    /**
     * Obtenir un livre par ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Détails d'un livre", description = "Obtenir un livre par ID")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        log.info("GET /api/books/{}", id);
        BookDTO book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    /**
     * Créer un livre (ADMIN)
     */
    @PostMapping
    @Operation(summary = "Créer un livre", description = "Créer un nouveau livre (ADMIN)")
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody CreateBookRequest request) {
        log.info("POST /api/books - Title: {}", request.getTitle());
        BookDTO book = bookService.createBook(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }

    /**
     * Mettre à jour un livre (ADMIN)
     */
    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un livre", description = "Modifier un livre (ADMIN)")
    public ResponseEntity<BookDTO> updateBook(
            @PathVariable Long id,
            @Valid @RequestBody CreateBookRequest request) {
        log.info("PUT /api/books/{}", id);
        BookDTO book = bookService.updateBook(id, request);
        return ResponseEntity.ok(book);
    }

    /**
     * Supprimer un livre (ADMIN)
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un livre", description = "Supprimer un livre (ADMIN)")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        log.info("DELETE /api/books/{}", id);
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Rechercher sur Google Books
     */
    @GetMapping("/google/search")
    @Operation(summary = "Rechercher sur Google Books", description = "Recherche via Google Books API")
    public ResponseEntity<List<BookDTO>> searchGoogleBooks(
            @RequestParam String query,
            @RequestParam(defaultValue = "10") int maxResults) {
        log.info("GET /api/books/google/search - Query: {}", query);
        List<BookDTO> books = googleBooksService.searchGoogleBooks(query, maxResults);
        return ResponseEntity.ok(books);
    }

    /**
     * Importer depuis Google Books
     */
    @PostMapping("/google/import/{googleBooksId}")
    @Operation(summary = "Importer depuis Google Books", description = "Importer un livre de Google Books")
    public ResponseEntity<BookDTO> importFromGoogleBooks(@PathVariable String googleBooksId) {
        log.info("POST /api/books/google/import/{}", googleBooksId);
        BookDTO book = googleBooksService.importFromGoogleBooks(googleBooksId);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }

    /**
     * Obtenir les livres par genre
     */
    @GetMapping("/genre/{genreName}")
    @Operation(summary = "Livres par genre", description = "Obtenir les livres d'un genre")
    public ResponseEntity<PageResponse<BookDTO>> getBooksByGenre(
            @PathVariable String genreName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/books/genre/{}", genreName);
        PageResponse<BookDTO> response = bookService.getBooksByGenre(genreName, page, size);
        return ResponseEntity.ok(response);
    }
}
