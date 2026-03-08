package com.booktracker.tracker.service;

import com.booktracker.tracker.client.BookServiceClient;
import com.booktracker.tracker.domain.ReadingStatus;
import com.booktracker.tracker.domain.UserBook;
import com.booktracker.tracker.dto.AddBookRequest;
import com.booktracker.tracker.dto.BookInfoDTO;
import com.booktracker.tracker.dto.UserBookDTO;
import com.booktracker.tracker.repository.UserBookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service pour gérer les livres utilisateur
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserBookService {

    private final UserBookRepository userBookRepository;
    private final BookServiceClient bookServiceClient;

    /**
     * Ajouter un livre à la bibliothèque
     */
    public UserBookDTO addBook(Long userId, AddBookRequest request) {
        // Vérifier si le livre existe déjà
        if (userBookRepository.existsByUserIdAndBookId(userId, request.getBookId())) {
            throw new IllegalArgumentException("Ce livre existe déjà dans votre bibliothèque");
        }

        // Récupérer les infos du livre
        BookInfoDTO bookInfo = getBookInfo(request.getBookId());

        UserBook userBook = new UserBook();
        userBook.setUserId(userId);
        userBook.setBookId(request.getBookId());
        userBook.setStatus(request.getStatus());
        userBook.setCurrentPage(request.getCurrentPage() != null ? request.getCurrentPage() : 0);
        userBook.setStartDate(request.getStartDate());
        userBook.setIsFavorite(request.getIsFavorite() != null ? request.getIsFavorite() : false);

        // Si le statut est READING et pas de date de début, mettre aujourd'hui
        if (request.getStatus() == ReadingStatus.READING && request.getStartDate() == null) {
            userBook.setStartDate(LocalDate.now());
        }

        UserBook saved = userBookRepository.save(userBook);
        return mapToDTO(saved, bookInfo);
    }

    /**
     * Obtenir tous les livres d'un utilisateur
     */
    @Transactional(readOnly = true)
    public Page<UserBookDTO> getUserBooks(Long userId, Pageable pageable) {
        Page<UserBook> userBooks = userBookRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
        
        List<UserBookDTO> dtos = userBooks.getContent().stream()
                .map(ub -> {
                    BookInfoDTO bookInfo = getBookInfo(ub.getBookId());
                    return mapToDTO(ub, bookInfo);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(dtos, pageable, userBooks.getTotalElements());
    }

    /**
     * Obtenir les livres par statut
     */
    @Transactional(readOnly = true)
    public Page<UserBookDTO> getBooksByStatus(Long userId, ReadingStatus status, Pageable pageable) {
        Page<UserBook> userBooks = userBookRepository.findByUserIdAndStatus(userId, status, pageable);
        
        List<UserBookDTO> dtos = userBooks.getContent().stream()
                .map(ub -> {
                    BookInfoDTO bookInfo = getBookInfo(ub.getBookId());
                    return mapToDTO(ub, bookInfo);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(dtos, pageable, userBooks.getTotalElements());
    }

    /**
     * Obtenir tous les livres par statut (sans pagination)
     * Utilisé par le service de recommandations
     */
    @Transactional(readOnly = true)
    public List<UserBookDTO> getAllBooksByStatus(Long userId, ReadingStatus status) {
        List<UserBook> userBooks = userBookRepository.findByUserIdAndStatus(userId, status);
        
        return userBooks.stream()
                .map(ub -> {
                    BookInfoDTO bookInfo = getBookInfo(ub.getBookId());
                    return mapToDTO(ub, bookInfo);
                })
                .collect(Collectors.toList());
    }

    /**
     * Obtenir les favoris
     */
    @Transactional(readOnly = true)
    public List<UserBookDTO> getFavorites(Long userId) {
        List<UserBook> favorites = userBookRepository.findByUserIdAndIsFavoriteTrue(userId);
        
        return favorites.stream()
                .map(ub -> {
                    BookInfoDTO bookInfo = getBookInfo(ub.getBookId());
                    return mapToDTO(ub, bookInfo);
                })
                .collect(Collectors.toList());
    }

    /**
     * Obtenir un livre de l'utilisateur par bookId
     */
    @Transactional(readOnly = true)
    public UserBookDTO getUserBookByBookId(Long userId, Long bookId) {
        UserBook userBook = userBookRepository.findByUserIdAndBookId(userId, bookId)
                .orElse(null);
        
        if (userBook == null) {
            return null;
        }
        
        BookInfoDTO bookInfo = getBookInfo(userBook.getBookId());
        return mapToDTO(userBook, bookInfo);
    }

    /**
     * Mettre à jour la progression
     */
    public UserBookDTO updateProgress(Long userId, Long bookId, Integer currentPage) {
        UserBook userBook = userBookRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new IllegalArgumentException("Livre non trouvé dans votre bibliothèque"));

        userBook.setCurrentPage(currentPage);

        // Si le statut est TO_READ et qu'on commence à lire, changer le statut
        if (userBook.getStatus() == ReadingStatus.TO_READ && currentPage > 0) {
            userBook.setStatus(ReadingStatus.READING);
            if (userBook.getStartDate() == null) {
                userBook.setStartDate(LocalDate.now());
            }
        }

        // Si on a fini le livre (currentPage >= pageCount)
        BookInfoDTO bookInfo = getBookInfo(bookId);
        if (bookInfo.getPageCount() != null && currentPage >= bookInfo.getPageCount()) {
            userBook.setStatus(ReadingStatus.FINISHED);
            if (userBook.getFinishDate() == null) {
                userBook.setFinishDate(LocalDate.now());
            }
        }

        UserBook updated = userBookRepository.save(userBook);
        return mapToDTO(updated, bookInfo);
    }

    /**
     * Changer le statut
     */
    public UserBookDTO updateStatus(Long userId, Long bookId, ReadingStatus status) {
        UserBook userBook = userBookRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new IllegalArgumentException("Livre non trouvé dans votre bibliothèque"));

        userBook.setStatus(status);

        // Gérer les dates automatiquement
        if (status == ReadingStatus.READING && userBook.getStartDate() == null) {
            userBook.setStartDate(LocalDate.now());
        } else if (status == ReadingStatus.FINISHED && userBook.getFinishDate() == null) {
            userBook.setFinishDate(LocalDate.now());
        }

        UserBook updated = userBookRepository.save(userBook);
        BookInfoDTO bookInfo = getBookInfo(bookId);
        return mapToDTO(updated, bookInfo);
    }

    /**
     * Ajouter/retirer des favoris
     */
    public UserBookDTO toggleFavorite(Long userId, Long bookId) {
        UserBook userBook = userBookRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new IllegalArgumentException("Livre non trouvé dans votre bibliothèque"));

        userBook.setIsFavorite(!userBook.getIsFavorite());
        UserBook updated = userBookRepository.save(userBook);
        
        BookInfoDTO bookInfo = getBookInfo(bookId);
        return mapToDTO(updated, bookInfo);
    }

    /**
     * Supprimer un livre
     */
    public void removeBook(Long userId, Long bookId) {
        UserBook userBook = userBookRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new IllegalArgumentException("Livre non trouvé dans votre bibliothèque"));
        
        userBookRepository.delete(userBook);
    }

    /**
     * Obtenir les statistiques
     */
    @Transactional(readOnly = true)
    public UserBookStatsDTO getStats(Long userId) {
        long toRead = userBookRepository.countByUserIdAndStatus(userId, ReadingStatus.TO_READ);
        long reading = userBookRepository.countByUserIdAndStatus(userId, ReadingStatus.READING);
        long finished = userBookRepository.countByUserIdAndStatus(userId, ReadingStatus.FINISHED);
        long abandoned = userBookRepository.countByUserIdAndStatus(userId, ReadingStatus.ABANDONED);

        return UserBookStatsDTO.builder()
                .toRead(toRead)
                .reading(reading)
                .finished(finished)
                .abandoned(abandoned)
                .total(toRead + reading + finished + abandoned)
                .build();
    }

    /**
     * Récupérer les infos du livre depuis Book Service
     */
    private BookInfoDTO getBookInfo(Long bookId) {
        try {
            return bookServiceClient.getBookById(bookId);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération du livre {}", bookId, e);
            // Retourner un DTO vide plutôt que de planter
            return BookInfoDTO.builder()
                    .id(bookId)
                    .title("Livre non disponible")
                    .pageCount(0)
                    .build();
        }
    }

    /**
     * Mapper vers DTO
     */
    private UserBookDTO mapToDTO(UserBook userBook, BookInfoDTO bookInfo) {
        Double progress = null;
        if (bookInfo.getPageCount() != null && bookInfo.getPageCount() > 0) {
            progress = userBook.getProgressPercentage(bookInfo.getPageCount());
        }

        return UserBookDTO.builder()
                .id(userBook.getId())
                .userId(userBook.getUserId())
                .bookId(userBook.getBookId())
                .status(userBook.getStatus())
                .currentPage(userBook.getCurrentPage())
                .startDate(userBook.getStartDate())
                .finishDate(userBook.getFinishDate())
                .isFavorite(userBook.getIsFavorite())
                .progressPercentage(progress)
                .bookTitle(bookInfo.getTitle())
                .bookThumbnail(bookInfo.getThumbnailUrl())
                .bookPageCount(bookInfo.getPageCount())
                .build();
    }
}
