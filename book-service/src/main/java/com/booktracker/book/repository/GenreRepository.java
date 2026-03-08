package com.booktracker.book.repository;

import com.booktracker.book.domain.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository pour Genre
 */
@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    
    Optional<Genre> findByName(String name);
}
