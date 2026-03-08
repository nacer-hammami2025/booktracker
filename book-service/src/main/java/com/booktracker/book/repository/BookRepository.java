package com.booktracker.book.repository;

import com.booktracker.book.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository pour Book
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @EntityGraph(attributePaths = {"authors", "genres"})
    Optional<Book> findByGoogleBooksId(String googleBooksId);

    @EntityGraph(attributePaths = {"authors", "genres"})
    Optional<Book> findByIsbn(String isbn);

    @EntityGraph(attributePaths = {"authors", "genres"})
    @Override
    Optional<Book> findById(Long id);

    @EntityGraph(attributePaths = {"authors", "genres"})
    @Override
    Page<Book> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"authors", "genres"})
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "EXISTS (SELECT a FROM b.authors a WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Book> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @EntityGraph(attributePaths = {"authors", "genres"})
    @Query("SELECT b FROM Book b JOIN b.genres g WHERE g.name = :genreName")
    Page<Book> findByGenreName(@Param("genreName") String genreName, Pageable pageable);
}
