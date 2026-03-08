package com.booktracker.reco.service;

import com.booktracker.reco.client.BookServiceClient;
import com.booktracker.reco.client.TrackerServiceClient;
import com.booktracker.reco.dto.BookDTO;
import com.booktracker.reco.dto.UserBookDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service de recommandations content-based
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {

    private final BookServiceClient bookServiceClient;
    private final TrackerServiceClient trackerServiceClient;

    /**
     * Obtenir des recommandations basées sur les genres préférés
     * Résultat mis en cache pendant 1 heure
     */
    @Cacheable(value = "recommendations", key = "#userId", unless = "#result.isEmpty()")
    public List<BookDTO> getRecommendations(Long userId, int limit) {
        try {
            log.info("Génération des recommandations pour l'utilisateur {}", userId);

            // 1. Récupérer les livres favoris et terminés
            List<UserBookDTO> favoriteBooks = trackerServiceClient.getFavorites(userId);
            List<UserBookDTO> finishedBooks = trackerServiceClient.getBooksByStatus(userId, "FINISHED");

            // Combiner favoris et terminés
            Set<Long> userBookIds = new HashSet<>();
            favoriteBooks.forEach(ub -> userBookIds.add(ub.getBookId()));
            finishedBooks.forEach(ub -> userBookIds.add(ub.getBookId()));

            if (userBookIds.isEmpty()) {
                log.info("Aucun historique de lecture, génération de recommandations par défaut");
                // Pour les nouveaux utilisateurs, retourner des livres populaires/récents
                return getDefaultRecommendations(limit);
            }

            // 2. Récupérer les détails des livres pour analyser les genres
            List<BookDTO> userBooksDetails = new ArrayList<>();
            for (Long bookId : userBookIds) {
                try {
                    BookDTO book = bookServiceClient.getBookById(bookId);
                    if (book != null) {
                        userBooksDetails.add(book);
                    }
                } catch (Exception e) {
                    log.warn("Impossible de récupérer le livre {}", bookId, e);
                }
            }

            // 3. Analyser les genres préférés
            Map<String, Long> genreCounts = new HashMap<>();
            for (BookDTO book : userBooksDetails) {
                if (book.getGenres() != null) {
                    for (String genre : book.getGenres()) {
                        genreCounts.merge(genre, 1L, Long::sum);
                    }
                }
            }

            // Trier les genres par fréquence
            List<String> topGenres = genreCounts.entrySet().stream()
                    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                    .limit(3)
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());

            if (topGenres.isEmpty()) {
                log.info("Aucun genre identifié");
                return Collections.emptyList();
            }

            // 4. Chercher des livres dans les genres préférés
            Set<BookDTO> recommendations = new LinkedHashSet<>();
            for (String genre : topGenres) {
                try {
                    List<BookDTO> genreBooks = bookServiceClient.getBooksByGenre(genre, 10);
                    
                    // Filtrer les livres déjà lus
                    genreBooks.stream()
                            .filter(book -> !userBookIds.contains(book.getId()))
                            .forEach(recommendations::add);
                    
                    if (recommendations.size() >= limit) {
                        break;
                    }
                } catch (Exception e) {
                    log.warn("Erreur lors de la récupération des livres du genre {}", genre, e);
                }
            }

            List<BookDTO> result = recommendations.stream()
                    .limit(limit)
                    .collect(Collectors.toList());

            log.info("Généré {} recommandations pour l'utilisateur {}", result.size(), userId);
            return result;

        } catch (Exception e) {
            log.error("Erreur lors de la génération des recommandations", e);
            return Collections.emptyList();
        }
    }

    /**
     * Obtenir des recommandations basées sur un livre spécifique
     */
    @Cacheable(value = "similarBooks", key = "#bookId", unless = "#result.isEmpty()")
    public List<BookDTO> getSimilarBooks(Long bookId, int limit) {
        try {
            // Récupérer le livre source
            BookDTO sourceBook = bookServiceClient.getBookById(bookId);
            if (sourceBook == null || sourceBook.getGenres() == null || sourceBook.getGenres().isEmpty()) {
                return Collections.emptyList();
            }

            // Chercher des livres dans les mêmes genres
            Set<BookDTO> similarBooks = new LinkedHashSet<>();
            for (String genre : sourceBook.getGenres()) {
                try {
                    List<BookDTO> genreBooks = bookServiceClient.getBooksByGenre(genre, 15);
                    
                    // Exclure le livre source
                    genreBooks.stream()
                            .filter(book -> !book.getId().equals(bookId))
                            .forEach(similarBooks::add);
                    
                    if (similarBooks.size() >= limit) {
                        break;
                    }
                } catch (Exception e) {
                    log.warn("Erreur lors de la récupération des livres du genre {}", genre, e);
                }
            }

            return similarBooks.stream()
                    .limit(limit)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("Erreur lors de la recherche de livres similaires", e);
            return Collections.emptyList();
        }
    }

    /**
     * Recommandations par défaut pour les nouveaux utilisateurs
     * Retourne une sélection de livres populaires dans différents genres
     */
    private List<BookDTO> getDefaultRecommendations(int limit) {
        try {
            log.info("Génération de recommandations par défaut (livres populaires)");
            
            // Chercher des livres dans des genres populaires
            String[] popularGenres = {"Fantasy", "Science Fiction", "Classique", "Jeunesse", "Philosophie"};
            Set<BookDTO> recommendations = new LinkedHashSet<>();
            
            for (String genre : popularGenres) {
                try {
                    List<BookDTO> genreBooks = bookServiceClient.getBooksByGenre(genre, 3);
                    recommendations.addAll(genreBooks);
                    
                    if (recommendations.size() >= limit) {
                        break;
                    }
                } catch (Exception e) {
                    log.warn("Erreur lors de la récupération des livres du genre {}", genre, e);
                }
            }
            
            // Si pas assez de livres par genre, récupérer les premiers livres disponibles
            if (recommendations.size() < limit) {
                try {
                    List<BookDTO> allBooks = bookServiceClient.getAllBooks(limit);
                    recommendations.addAll(allBooks);
                } catch (Exception e) {
                    log.warn("Erreur lors de la récupération de tous les livres", e);
                }
            }
            
            List<BookDTO> result = recommendations.stream()
                    .limit(limit)
                    .collect(Collectors.toList());
            
            log.info("Généré {} recommandations par défaut", result.size());
            return result;
            
        } catch (Exception e) {
            log.error("Erreur lors de la génération des recommandations par défaut", e);
            return Collections.emptyList();
        }
    }
}
