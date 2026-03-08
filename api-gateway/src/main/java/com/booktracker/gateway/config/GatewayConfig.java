package com.booktracker.gateway.config;

import com.booktracker.gateway.filter.AuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration des routes du Gateway
 * NOTE: Routes are now configured in application-docker.yml instead of here
 * This programmatic configuration is commented out to avoid conflicts
 */
@Configuration
public class GatewayConfig {

    @Autowired
    private AuthenticationFilter authFilter;

    // @Bean
    // Routes now configured via YAML - see application-docker.yml
    public RouteLocator gatewayRoutes_DISABLED(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service-register", r -> r
                        .path("/api/auth/register")
                        .and()
                        .method("POST")
                        .uri("lb://auth-service"))
                
                .route("auth-service-login", r -> r
                        .path("/api/auth/login")
                        .and()
                        .method("POST")
                        .uri("lb://auth-service"))
                
                .route("auth-service-profile", r -> r
                        .path("/api/auth/**")
                        .filters(f -> f.filter(authFilter))
                        .uri("lb://auth-service"))
                
                .route("book-service-public", r -> r
                        .path("/api/books/search", "/api/books/{id}")
                        .and()
                        .method("GET")
                        .uri("lb://book-service"))
                
                .route("book-service-protected", r -> r
                        .path("/api/books/**")
                        .filters(f -> f.filter(authFilter))
                        .uri("lb://book-service"))
                
                .route("tracker-service", r -> r
                        .path("/api/tracker/**")
                        .filters(f -> f.filter(authFilter))
                        .uri("lb://tracker-service"))
                
                .route("reco-service", r -> r
                        .path("/api/recommendations/**", "/api/stats/**")
                        .filters(f -> f.filter(authFilter))
                        .uri("lb://reco-service"))
                
                .build();
    }
}
