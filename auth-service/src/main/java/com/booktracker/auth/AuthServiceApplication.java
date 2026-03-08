package com.booktracker.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Auth Service - Gestion de l'authentification et des utilisateurs
 * 
 * Responsabilités:
 * - Inscription et connexion des utilisateurs
 * - Génération et validation des tokens JWT
 * - Gestion des profils utilisateurs
 * - Réinitialisation de mot de passe
 * 
 * @author Mohamed Nacer Hammami
 * @version 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}
