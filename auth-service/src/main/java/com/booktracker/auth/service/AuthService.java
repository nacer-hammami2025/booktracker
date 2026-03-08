package com.booktracker.auth.service;

import com.booktracker.auth.domain.Role;
import com.booktracker.auth.domain.User;
import com.booktracker.auth.dto.AuthResponse;
import com.booktracker.auth.dto.LoginRequest;
import com.booktracker.auth.dto.RegisterRequest;
import com.booktracker.auth.dto.UserDTO;
import com.booktracker.auth.repository.UserRepository;
import com.booktracker.auth.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service d'authentification
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    /**
     * Inscription d'un nouvel utilisateur
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.info("Tentative d'inscription pour l'utilisateur: {}", request.getUsername());

        // Vérifier si l'utilisateur existe déjà
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Le nom d'utilisateur existe déjà");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("L'email existe déjà");
        }

        // Créer le nouvel utilisateur
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(Role.READER)
                .active(true)
                .build();

        user = userRepository.save(user);
        log.info("Utilisateur créé avec succès: {}", user.getUsername());

        // Générer le token JWT
        String token = jwtUtil.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .expiresIn(jwtExpiration / 1000)
                .build();
    }

    /**
     * Connexion d'un utilisateur
     */
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        log.info("Tentative de connexion pour l'utilisateur: {}", request.getUsername());

        // Authentifier l'utilisateur
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // Récupérer l'utilisateur (accepte username ou email)
        User user = userRepository.findByUsernameAndActiveTrue(request.getUsername())
                .or(() -> userRepository.findByEmailAndActiveTrue(request.getUsername()))
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé ou inactif"));

        // Générer le token JWT
        String token = jwtUtil.generateToken(user);

        log.info("Connexion réussie pour l'utilisateur: {}", user.getUsername());

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .expiresIn(jwtExpiration / 1000)
                .build();
    }

    /**
     * Obtenir le profil d'un utilisateur
     */
    @Transactional(readOnly = true)
    public UserDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .active(user.getActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    /**
     * Mettre à jour le profil d'un utilisateur
     */
    @Transactional
    public UserDTO updateProfile(Long userId, UserDTO userDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (userDTO.getFullName() != null) {
            user.setFullName(userDTO.getFullName());
        }
        if (userDTO.getEmail() != null && !userDTO.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userDTO.getEmail())) {
                throw new RuntimeException("L'email existe déjà");
            }
            user.setEmail(userDTO.getEmail());
        }

        user = userRepository.save(user);

        return getUserProfile(user.getId());
    }
}
