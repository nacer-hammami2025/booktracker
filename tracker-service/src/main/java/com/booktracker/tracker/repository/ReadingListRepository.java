package com.booktracker.tracker.repository;

import com.booktracker.tracker.domain.ReadingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour ReadingList
 */
@Repository
public interface ReadingListRepository extends JpaRepository<ReadingList, Long> {

    List<ReadingList> findByUserIdOrderByCreatedAtDesc(Long userId);
}
