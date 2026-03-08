package com.booktracker.tracker.client;

import com.booktracker.tracker.dto.BookInfoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Client Feign pour Book Service
 */
@FeignClient(name = "book-service", url = "${book-service.url}")
public interface BookServiceClient {

    @GetMapping("/api/books/{id}")
    BookInfoDTO getBookById(@PathVariable("id") Long id);
}
