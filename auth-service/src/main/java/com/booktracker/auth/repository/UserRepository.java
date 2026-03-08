package com.booktracker.auth.repository;

import com.booktracker.auth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository pour l'entité User
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Trouver un utilisateur par username
     */
    Optional<User> findByUsername(String username);

    /**
     * Trouver un utilisateur par email
     */
    Optional<User> findByEmail(String email);

    /**
     * Vérifier si un username existe
     */
    boolean existsByUsername(String username);

    /**
     * Vérifier si un email existe
     */
    boolean existsByEmail(String email);

    /**
     * Trouver un utilisateur actif par username
     */
    Optional<User> findByUsernameAndActiveTrue(String username);

    /**
     * Trouver un utilisateur actif par email
     */
    Optional<User> findByEmailAndActiveTrue(String email);
}
