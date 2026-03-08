package com.booktracker.auth.controller;

import com.booktracker.auth.dto.AuthResponse;
import com.booktracker.auth.dto.LoginRequest;
import com.booktracker.auth.dto.RegisterRequest;
import com.booktracker.auth.dto.UserDTO;
import com.booktracker.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Contrôleur pour l'authentification
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authentication", description = "API d'authentification et gestion des utilisateurs")
public class AuthController {

    private final AuthService authService;

    /**
     * Inscription d'un nouvel utilisateur
     */
    @PostMapping("/register")
    @Operation(summary = "Inscription", description = "Créer un nouveau compte utilisateur")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("POST /api/auth/register - Inscription: {}", request.getUsername());
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Connexion
     */
    @PostMapping("/login")
    @Operation(summary = "Connexion", description = "Se connecter avec username et password")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("POST /api/auth/login - Connexion: {}", request.getUsername());
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Obtenir le profil de l'utilisateur connecté
     */
    @GetMapping("/profile")
    @Operation(summary = "Profil utilisateur", description = "Obtenir le profil de l'utilisateur connecté")
    public ResponseEntity<UserDTO> getProfile(@RequestHeader("X-User-Id") Long userId) {
        log.info("GET /api/auth/profile - User ID: {}", userId);
        UserDTO userDTO = authService.getUserProfile(userId);
        return ResponseEntity.ok(userDTO);
    }

    /**
     * Mettre à jour le profil
     */
    @PutMapping("/profile")
    @Operation(summary = "Mise à jour profil", description = "Mettre à jour le profil utilisateur")
    public ResponseEntity<UserDTO> updateProfile(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody UserDTO userDTO) {
        log.info("PUT /api/auth/profile - User ID: {}", userId);
        UserDTO updated = authService.updateProfile(userId, userDTO);
        return ResponseEntity.ok(updated);
    }
}
