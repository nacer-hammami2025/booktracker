package com.booktracker.gateway.util;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

/**
 * Validateur pour déterminer quelles routes nécessitent une authentification
 */
@Component
public class RouterValidator {

    /**
     * Routes publiques qui ne nécessitent pas d'authentification
     */
    public static final List<String> openApiEndpoints = List.of(
            "/api/auth/register",
            "/api/auth/login",
            "/api/books/search",
            "/actuator/health",
            "/actuator/info"
    );

    /**
     * Prédicat pour vérifier si la route est sécurisée
     */
    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));
}
