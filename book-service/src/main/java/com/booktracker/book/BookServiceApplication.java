package com.booktracker.book;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Book Service - Gestion du catalogue de livres
 * 
 * @author Mohamed Nacer Hammami
 */
@SpringBootApplication
@EnableJpaAuditing
public class BookServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookServiceApplication.class, args);
    }
}
