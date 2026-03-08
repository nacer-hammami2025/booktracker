package com.booktracker.reco.controller;

import com.booktracker.reco.dto.ReadingGoalDTO;
import com.booktracker.reco.dto.UserStatisticsDTO;
import com.booktracker.reco.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Year;

/**
 * Contrôleur REST pour les statistiques
 */
@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    /**
     * Obtenir les statistiques d'un utilisateur
     */
    @GetMapping
    public ResponseEntity<UserStatisticsDTO> getUserStatistics(
            @RequestHeader("X-User-Id") Long userId) {
        UserStatisticsDTO stats = statisticsService.getUserStatistics(userId);
        return ResponseEntity.ok(stats);
    }

    /**
     * Créer ou mettre à jour l'objectif de lecture
     */
    @PostMapping("/goals")
    public ResponseEntity<ReadingGoalDTO> setReadingGoal(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam Integer targetBooks,
            @RequestParam(required = false) Integer year) {
        
        Integer goalYear = year != null ? year : Year.now().getValue();
        ReadingGoalDTO goal = statisticsService.setReadingGoal(userId, targetBooks, goalYear);
        return ResponseEntity.ok(goal);
    }

    /**
     * Obtenir l'objectif de lecture
     */
    @GetMapping("/goals")
    public ResponseEntity<ReadingGoalDTO> getReadingGoal(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam(required = false) Integer year) {
        
        Integer goalYear = year != null ? year : Year.now().getValue();
        ReadingGoalDTO goal = statisticsService.getReadingGoal(userId, goalYear);
        
        if (goal == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(goal);
    }

    /**
     * Mettre à jour la progression de l'objectif
     */
    @PutMapping("/goals/refresh")
    public ResponseEntity<ReadingGoalDTO> updateGoalProgress(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam(required = false) Integer year) {
        
        Integer goalYear = year != null ? year : Year.now().getValue();
        ReadingGoalDTO goal = statisticsService.updateGoalProgress(userId, goalYear);
        return ResponseEntity.ok(goal);
    }

    /**
     * Invalider le cache des statistiques
     */
    @PostMapping("/cache/invalidate")
    public ResponseEntity<Void> invalidateCache(@RequestHeader("X-User-Id") Long userId) {
        statisticsService.invalidateStatisticsCache(userId);
        return ResponseEntity.noContent().build();
    }
}
