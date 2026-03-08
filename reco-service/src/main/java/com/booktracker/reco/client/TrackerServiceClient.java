package com.booktracker.reco.client;

import com.booktracker.reco.dto.UserBookDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

/**
 * Client Feign pour Tracker Service
 */
@FeignClient(name = "tracker-service", url = "${tracker-service.url}")
public interface TrackerServiceClient {

    @GetMapping("/api/user-books/list/status/{status}")
    List<UserBookDTO> getBooksByStatus(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable("status") String status);

    @GetMapping("/api/user-books/favorites")
    List<UserBookDTO> getFavorites(@RequestHeader("X-User-Id") Long userId);
}
