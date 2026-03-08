package com.booktracker.auth.service;

import com.booktracker.auth.domain.User;
import com.booktracker.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Service pour charger les détails de l'utilisateur (Spring Security)
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        // Essayer de trouver par username d'abord, puis par email
        User user = userRepository.findByUsernameAndActiveTrue(usernameOrEmail)
                .or(() -> userRepository.findByEmailAndActiveTrue(usernameOrEmail))
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Utilisateur non trouvé: " + usernameOrEmail));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
                ))
                .build();
    }
}
