package com.booktracker.reco.service;

import com.booktracker.reco.client.BookServiceClient;
import com.booktracker.reco.client.TrackerServiceClient;
import com.booktracker.reco.domain.ReadingGoal;
import com.booktracker.reco.dto.*;
import com.booktracker.reco.repository.ReadingGoalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service de statistiques utilisateur avec cache Redis
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class StatisticsService {

    private final TrackerServiceClient trackerServiceClient;
    private final BookServiceClient bookServiceClient;
    private final ReadingGoalRepository readingGoalRepository;

    /**
     * Obtenir les statistiques complètes d'un utilisateur
     * Cache Redis pendant 5 minutes
     */
    @Cacheable(value = "userStatistics", key = "#userId")
    public UserStatisticsDTO getUserStatistics(Long userId) {
        try {
            log.info("Calcul des statistiques pour l'utilisateur {}", userId);

            // Récupérer tous les livres de l'utilisateur
            List<UserBookDTO> finishedBooks = trackerServiceClient.getBooksByStatus(userId, "FINISHED");
            List<UserBookDTO> readingBooks = trackerServiceClient.getBooksByStatus(userId, "READING");
            List<UserBookDTO> toReadBooks = trackerServiceClient.getBooksByStatus(userId, "TO_READ");
            List<UserBookDTO> abandonedBooks = trackerServiceClient.getBooksByStatus(userId, "ABANDONED");

            // Analyser les genres préférés
            Map<String, Long> genreCounts = analyzeGenres(finishedBooks);

            // Calculer les statistiques
            UserStatisticsDTO stats = UserStatisticsDTO.builder()
                    .userId(userId)
                    .totalBooksRead((long) finishedBooks.size())
                    .totalBooksReading((long) readingBooks.size())
                    .totalBooksToRead((long) toReadBooks.size())
                    .totalBooksAbandoned((long) abandonedBooks.size())
                    .favoriteGenres(genreCounts)
                    .build();

            // Ajouter l'objectif de l'année en cours
            int currentYear = Year.now().getValue();
            readingGoalRepository.findByUserIdAndYear(userId, currentYear)
                    .ifPresent(goal -> stats.setCurrentYearGoal(mapGoalToDTO(goal)));

            return stats;

        } catch (Exception e) {
            log.error("Erreur lors du calcul des statistiques", e);
            return UserStatisticsDTO.builder()
                    .userId(userId)
                    .totalBooksRead(0L)
                    .totalBooksReading(0L)
                    .totalBooksToRead(0L)
                    .totalBooksAbandoned(0L)
                    .build();
        }
    }

    /**
     * Analyser les genres préférés
     */
    private Map<String, Long> analyzeGenres(List<UserBookDTO> books) {
        Map<String, Long> genreCounts = new HashMap<>();
        
        for (UserBookDTO userBook : books) {
            try {
                BookDTO book = bookServiceClient.getBookById(userBook.getBookId());
                if (book != null && book.getGenres() != null) {
                    for (String genre : book.getGenres()) {
                        genreCounts.merge(genre, 1L, Long::sum);
                    }
                }
            } catch (Exception e) {
                log.warn("Impossible de récupérer le livre {}", userBook.getBookId());
            }
        }

        // Retourner les 5 genres les plus fréquents
        return genreCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }

    /**
     * Créer ou mettre à jour l'objectif de lecture
     */
    @CacheEvict(value = "userStatistics", key = "#userId")
    public ReadingGoalDTO setReadingGoal(Long userId, Integer targetBooks, Integer year) {
        ReadingGoal goal = readingGoalRepository.findByUserIdAndYear(userId, year)
                .orElse(new ReadingGoal());

        goal.setUserId(userId);
        goal.setTargetBooks(targetBooks);
        goal.setYear(year);

        if (goal.getId() == null) {
            goal.setCurrentProgress(0);
        }

        ReadingGoal saved = readingGoalRepository.save(goal);
        return mapGoalToDTO(saved);
    }

    /**
     * Obtenir l'objectif de lecture
     */
    @Transactional(readOnly = true)
    public ReadingGoalDTO getReadingGoal(Long userId, Integer year) {
        return readingGoalRepository.findByUserIdAndYear(userId, year)
                .map(this::mapGoalToDTO)
                .orElse(null);
    }

    /**
     * Mettre à jour la progression de l'objectif
     */
    @CacheEvict(value = "userStatistics", key = "#userId")
    public ReadingGoalDTO updateGoalProgress(Long userId, Integer year) {
        ReadingGoal goal = readingGoalRepository.findByUserIdAndYear(userId, year)
                .orElseThrow(() -> new IllegalArgumentException("Objectif non trouvé"));

        // Calculer le nombre de livres terminés cette année
        List<UserBookDTO> finishedBooks = trackerServiceClient.getBooksByStatus(userId, "FINISHED");
        goal.setCurrentProgress(finishedBooks.size());

        ReadingGoal updated = readingGoalRepository.save(goal);
        return mapGoalToDTO(updated);
    }

    /**
     * Invalider le cache des statistiques
     */
    @CacheEvict(value = "userStatistics", key = "#userId")
    public void invalidateStatisticsCache(Long userId) {
        log.info("Cache des statistiques invalidé pour l'utilisateur {}", userId);
    }

    /**
     * Mapper ReadingGoal vers DTO
     */
    private ReadingGoalDTO mapGoalToDTO(ReadingGoal goal) {
        return ReadingGoalDTO.builder()
                .id(goal.getId())
                .userId(goal.getUserId())
                .targetBooks(goal.getTargetBooks())
                .year(goal.getYear())
                .currentProgress(goal.getCurrentProgress())
                .progressPercentage(goal.getProgressPercentage())
                .isAchieved(goal.isAchieved())
                .build();
    }
}
