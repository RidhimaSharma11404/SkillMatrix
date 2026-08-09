package com.cognizant.skillmatrix.service;

import com.cognizant.skillmatrix.dto.AllocationRequestDTO;
import com.cognizant.skillmatrix.dto.DeveloperRequestDTO;
import com.cognizant.skillmatrix.dto.DeveloperResponseDTO;
import com.cognizant.skillmatrix.dto.StatsDTO;
import com.cognizant.skillmatrix.entity.DeveloperStatus;

import java.util.List;

public interface DeveloperService {

    List<DeveloperResponseDTO> getAllDevelopers(String search, DeveloperStatus status, String skill);

    DeveloperResponseDTO getDeveloperById(Long id);

    DeveloperResponseDTO createDeveloper(DeveloperRequestDTO dto);

    DeveloperResponseDTO updateDeveloper(Long id, DeveloperRequestDTO dto);

    DeveloperResponseDTO allocateDeveloper(Long id, AllocationRequestDTO dto);

    DeveloperResponseDTO releaseDeveloper(Long id);

    void deleteDeveloper(Long id);

    StatsDTO getDashboardStats();
}
