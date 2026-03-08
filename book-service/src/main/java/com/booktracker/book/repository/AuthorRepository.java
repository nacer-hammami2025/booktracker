package com.booktracker.book.repository;

import com.booktracker.book.domain.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository pour Author
 */
@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    
    Optional<Author> findByName(String name);
}
