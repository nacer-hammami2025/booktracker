package com.booktracker.tracker.service;

import com.booktracker.tracker.domain.ReadingList;
import com.booktracker.tracker.dto.CreateListRequest;
import com.booktracker.tracker.dto.ReadingListDTO;
import com.booktracker.tracker.repository.ReadingListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service pour gérer les listes de lecture
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ReadingListService {

    private final ReadingListRepository readingListRepository;

    /**
     * Créer une nouvelle liste
     */
    public ReadingListDTO createList(Long userId, CreateListRequest request) {
        ReadingList readingList = new ReadingList();
        readingList.setUserId(userId);
        readingList.setName(request.getName());
        readingList.setDescription(request.getDescription());
        readingList.setBookIds(new HashSet<>());

        ReadingList saved = readingListRepository.save(readingList);
        return mapToDTO(saved);
    }

    /**
     * Obtenir toutes les listes d'un utilisateur
     */
    @Transactional(readOnly = true)
    public List<ReadingListDTO> getUserLists(Long userId) {
        List<ReadingList> lists = readingListRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return lists.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtenir une liste par ID
     */
    @Transactional(readOnly = true)
    public ReadingListDTO getListById(Long userId, Long listId) {
        ReadingList readingList = readingListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("Liste non trouvée"));

        // Vérifier que la liste appartient à l'utilisateur
        if (!readingList.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Accès non autorisé à cette liste");
        }

        return mapToDTO(readingList);
    }

    /**
     * Mettre à jour une liste
     */
    public ReadingListDTO updateList(Long userId, Long listId, CreateListRequest request) {
        ReadingList readingList = readingListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("Liste non trouvée"));

        if (!readingList.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Accès non autorisé à cette liste");
        }

        readingList.setName(request.getName());
        readingList.setDescription(request.getDescription());

        ReadingList updated = readingListRepository.save(readingList);
        return mapToDTO(updated);
    }

    /**
     * Ajouter un livre à une liste
     */
    public ReadingListDTO addBookToList(Long userId, Long listId, Long bookId) {
        ReadingList readingList = readingListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("Liste non trouvée"));

        if (!readingList.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Accès non autorisé à cette liste");
        }

        if (readingList.getBookIds() == null) {
            readingList.setBookIds(new HashSet<>());
        }

        readingList.getBookIds().add(bookId);
        ReadingList updated = readingListRepository.save(readingList);
        
        return mapToDTO(updated);
    }

    /**
     * Retirer un livre d'une liste
     */
    public ReadingListDTO removeBookFromList(Long userId, Long listId, Long bookId) {
        ReadingList readingList = readingListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("Liste non trouvée"));

        if (!readingList.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Accès non autorisé à cette liste");
        }

        if (readingList.getBookIds() != null) {
            readingList.getBookIds().remove(bookId);
            ReadingList updated = readingListRepository.save(readingList);
            return mapToDTO(updated);
        }

        return mapToDTO(readingList);
    }

    /**
     * Supprimer une liste
     */
    public void deleteList(Long userId, Long listId) {
        ReadingList readingList = readingListRepository.findById(listId)
                .orElseThrow(() -> new IllegalArgumentException("Liste non trouvée"));

        if (!readingList.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Accès non autorisé à cette liste");
        }

        readingListRepository.delete(readingList);
    }

    /**
     * Mapper vers DTO
     */
    private ReadingListDTO mapToDTO(ReadingList readingList) {
        return ReadingListDTO.builder()
                .id(readingList.getId())
                .userId(readingList.getUserId())
                .name(readingList.getName())
                .description(readingList.getDescription())
                .bookIds(readingList.getBookIds())
                .bookCount(readingList.getBookIds() != null ? readingList.getBookIds().size() : 0)
                .build();
    }
}
