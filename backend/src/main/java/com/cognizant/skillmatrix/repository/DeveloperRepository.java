package com.cognizant.skillmatrix.repository;

import com.cognizant.skillmatrix.entity.Developer;
import com.cognizant.skillmatrix.entity.DeveloperStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeveloperRepository extends JpaRepository<Developer, Long> {

    Optional<Developer> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Developer> findByStatus(DeveloperStatus status);

    @Query("SELECT DISTINCT d FROM Developer d " +
           "LEFT JOIN d.skills s " +
           "WHERE (:status IS NULL OR d.status = :status) " +
           "AND (:search IS NULL OR LOWER(d.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(d.role) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(d.location) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "     OR LOWER(s) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:skill IS NULL OR LOWER(s) = LOWER(:skill)) " +
           "ORDER BY d.createdAt DESC")
    List<Developer> searchDevelopers(
            @Param("search") String search,
            @Param("status") DeveloperStatus status,
            @Param("skill") String skill
    );

    long countByStatus(DeveloperStatus status);
}
