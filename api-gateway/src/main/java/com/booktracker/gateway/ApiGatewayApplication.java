package com.booktracker.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * API Gateway - Point d'entrée unique pour tous les microservices
 * 
 * Responsabilités :
 * - Routage des requêtes vers les services appropriés
 * - Validation JWT sur toutes les routes protégées
 * - Gestion CORS
 * - Rate limiting
 * 
 * @author Mohamed Nacer Hammami
 * @version 1.0.0
 */
@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
