package com.booktracker.gateway.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

/**
 * Factory pour créer le filtre d'authentification utilisable dans application.yml
 */
@Component
public class AuthenticationGatewayFilterFactory extends AbstractGatewayFilterFactory<Object> {

    @Autowired
    private AuthenticationFilter authenticationFilter;

    public AuthenticationGatewayFilterFactory() {
        super(Object.class);
    }

    @Override
    public GatewayFilter apply(Object config) {
        return authenticationFilter;
    }
}
