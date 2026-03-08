package com.booktracker.reco.client;

import com.booktracker.reco.dto.BookDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Client Feign pour Book Service
 */
@FeignClient(name = "book-service", url = "${book-service.url}")
public interface BookServiceClient {

    @GetMapping("/api/books/{id}")
    BookDTO getBookById(@PathVariable("id") Long id);

    @GetMapping("/api/books/list")
    List<BookDTO> getAllBooks(
            @RequestParam(value = "limit", defaultValue = "10") int limit);

    @GetMapping("/api/books/list/genre/{genreName}")
    List<BookDTO> getBooksByGenre(
            @PathVariable("genreName") String genreName,
            @RequestParam(value = "limit", defaultValue = "10") int limit);
}
