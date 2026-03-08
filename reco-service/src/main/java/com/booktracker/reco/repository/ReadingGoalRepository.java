package com.booktracker.reco.repository;

import com.booktracker.reco.domain.ReadingGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository pour ReadingGoal
 */
@Repository
public interface ReadingGoalRepository extends JpaRepository<ReadingGoal, Long> {

    Optional<ReadingGoal> findByUserIdAndYear(Long userId, Integer year);

    boolean existsByUserIdAndYear(Long userId, Integer year);
}
