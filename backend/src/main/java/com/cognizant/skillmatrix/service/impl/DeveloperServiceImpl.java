package com.cognizant.skillmatrix.service.impl;

import com.cognizant.skillmatrix.dto.AllocationRequestDTO;
import com.cognizant.skillmatrix.dto.DeveloperRequestDTO;
import com.cognizant.skillmatrix.dto.DeveloperResponseDTO;
import com.cognizant.skillmatrix.dto.StatsDTO;
import com.cognizant.skillmatrix.entity.Developer;
import com.cognizant.skillmatrix.entity.DeveloperStatus;
import com.cognizant.skillmatrix.exception.DuplicateResourceException;
import com.cognizant.skillmatrix.exception.ResourceNotFoundException;
import com.cognizant.skillmatrix.repository.DeveloperRepository;
import com.cognizant.skillmatrix.service.DeveloperService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class DeveloperServiceImpl implements DeveloperService {

    private final DeveloperRepository developerRepository;

    public DeveloperServiceImpl(DeveloperRepository developerRepository) {
        this.developerRepository = developerRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DeveloperResponseDTO> getAllDevelopers(String search, DeveloperStatus status, String skill) {
        String cleanSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String cleanSkill = (skill != null && !skill.trim().isEmpty()) ? skill.trim() : null;

        List<Developer> developers = developerRepository.searchDevelopers(cleanSearch, status, cleanSkill);
        return developers.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DeveloperResponseDTO getDeveloperById(Long id) {
        Developer developer = findEntityById(id);
        return mapToResponseDTO(developer);
    }

    @Override
    public DeveloperResponseDTO createDeveloper(DeveloperRequestDTO dto) {
        if (developerRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Developer with email '" + dto.getEmail() + "' already exists");
        }

        Developer developer = new Developer();
        mapDtoToEntity(dto, developer);

        if (developer.getStatus() == null) {
            developer.setStatus(DeveloperStatus.AVAILABLE);
        }

        if (developer.getAvatarUrl() == null || developer.getAvatarUrl().trim().isEmpty()) {
            developer.setAvatarUrl("https://api.dicebear.com/7.x/bottts/svg?seed=" + developer.getName().replaceAll("\\s+", ""));
        }

        Developer saved = developerRepository.save(developer);
        return mapToResponseDTO(saved);
    }

    @Override
    public DeveloperResponseDTO updateDeveloper(Long id, DeveloperRequestDTO dto) {
        Developer developer = findEntityById(id);

        // If email changed, check for uniqueness
        if (!developer.getEmail().equalsIgnoreCase(dto.getEmail()) &&
                developerRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email '" + dto.getEmail() + "' is already in use by another developer");
        }

        mapDtoToEntity(dto, developer);
        Developer updated = developerRepository.save(developer);
        return mapToResponseDTO(updated);
    }

    @Override
    public DeveloperResponseDTO allocateDeveloper(Long id, AllocationRequestDTO dto) {
        Developer developer = findEntityById(id);
        developer.setStatus(DeveloperStatus.ALLOCATED);
        developer.setCurrentProject(dto.getProjectName());
        Developer updated = developerRepository.save(developer);
        return mapToResponseDTO(updated);
    }

    @Override
    public DeveloperResponseDTO releaseDeveloper(Long id) {
        Developer developer = findEntityById(id);
        developer.setStatus(DeveloperStatus.AVAILABLE);
        developer.setCurrentProject(null);
        Developer updated = developerRepository.save(developer);
        return mapToResponseDTO(updated);
    }

    @Override
    public void deleteDeveloper(Long id) {
        Developer developer = findEntityById(id);
        developerRepository.delete(developer);
    }

    @Override
    @Transactional(readOnly = true)
    public StatsDTO getDashboardStats() {
        long total = developerRepository.count();
        long available = developerRepository.countByStatus(DeveloperStatus.AVAILABLE);
        long allocated = developerRepository.countByStatus(DeveloperStatus.ALLOCATED);
        double benchPercentage = total > 0 ? ((double) available / total) * 100 : 0.0;

        List<Developer> all = developerRepository.findAll();
        Map<String, Long> topSkills = all.stream()
                .flatMap(d -> d.getSkills().stream())
                .collect(Collectors.groupingBy(s -> s, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(6)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));

        return new StatsDTO(total, available, allocated, Math.round(benchPercentage * 10.0) / 10.0, topSkills);
    }

    private Developer findEntityById(Long id) {
        return developerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Developer with ID " + id + " not found"));
    }

    private void mapDtoToEntity(DeveloperRequestDTO dto, Developer developer) {
        developer.setName(dto.getName());
        developer.setEmail(dto.getEmail());
        developer.setRole(dto.getRole());
        developer.setExperienceLevel(dto.getExperienceLevel());
        developer.setYearsOfExperience(dto.getYearsOfExperience());
        developer.setSkills(dto.getSkills() != null ? new HashSet<>(dto.getSkills()) : new HashSet<>());
        if (dto.getStatus() != null) {
            developer.setStatus(dto.getStatus());
        }
        developer.setCurrentProject(dto.getCurrentProject());
        developer.setLocation(dto.getLocation() != null ? dto.getLocation() : "Bangalore (Hybrid)");
        if (dto.getAvatarUrl() != null && !dto.getAvatarUrl().trim().isEmpty()) {
            developer.setAvatarUrl(dto.getAvatarUrl());
        }
    }

    private DeveloperResponseDTO mapToResponseDTO(Developer developer) {
        DeveloperResponseDTO dto = new DeveloperResponseDTO();
        dto.setId(developer.getId());
        dto.setName(developer.getName());
        dto.setEmail(developer.getEmail());
        dto.setRole(developer.getRole());
        dto.setExperienceLevel(developer.getExperienceLevel());
        dto.setYearsOfExperience(developer.getYearsOfExperience());
        dto.setSkills(developer.getSkills());
        dto.setStatus(developer.getStatus());
        dto.setCurrentProject(developer.getCurrentProject());
        dto.setLocation(developer.getLocation());
        dto.setAvatarUrl(developer.getAvatarUrl());
        dto.setCreatedAt(developer.getCreatedAt());
        dto.setUpdatedAt(developer.getUpdatedAt());
        return dto;
    }
}
