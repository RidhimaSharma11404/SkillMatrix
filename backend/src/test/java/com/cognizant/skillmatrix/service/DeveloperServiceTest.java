package com.cognizant.skillmatrix.service;

import com.cognizant.skillmatrix.dto.DeveloperRequestDTO;
import com.cognizant.skillmatrix.dto.DeveloperResponseDTO;
import com.cognizant.skillmatrix.entity.Developer;
import com.cognizant.skillmatrix.entity.DeveloperStatus;
import com.cognizant.skillmatrix.entity.ExperienceLevel;
import com.cognizant.skillmatrix.exception.ResourceNotFoundException;
import com.cognizant.skillmatrix.repository.DeveloperRepository;
import com.cognizant.skillmatrix.service.impl.DeveloperServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeveloperServiceTest {

    @Mock
    private DeveloperRepository developerRepository;

    @InjectMocks
    private DeveloperServiceImpl developerService;

    private Developer sampleDeveloper;
    private DeveloperRequestDTO sampleDTO;

    @BeforeEach
    void setUp() {
        sampleDeveloper = new Developer();
        sampleDeveloper.setId(1L);
        sampleDeveloper.setName("Rahul Sharma");
        sampleDeveloper.setEmail("rahul.s@cognizant.com");
        sampleDeveloper.setRole("Full Stack Engineer");
        sampleDeveloper.setExperienceLevel(ExperienceLevel.SENIOR);
        sampleDeveloper.setYearsOfExperience(5);
        sampleDeveloper.setSkills(new HashSet<>(Set.of("Java", "Spring Boot", "React")));
        sampleDeveloper.setStatus(DeveloperStatus.AVAILABLE);

        sampleDTO = new DeveloperRequestDTO();
        sampleDTO.setName("Rahul Sharma");
        sampleDTO.setEmail("rahul.s@cognizant.com");
        sampleDTO.setRole("Full Stack Engineer");
        sampleDTO.setExperienceLevel(ExperienceLevel.SENIOR);
        sampleDTO.setYearsOfExperience(5);
        sampleDTO.setSkills(new HashSet<>(Set.of("Java", "Spring Boot", "React")));
    }

    @Test
    void testGetDeveloperById_Success() {
        when(developerRepository.findById(1L)).thenReturn(Optional.of(sampleDeveloper));

        DeveloperResponseDTO result = developerService.getDeveloperById(1L);

        assertNotNull(result);
        assertEquals("Rahul Sharma", result.getName());
        assertEquals("rahul.s@cognizant.com", result.getEmail());
        verify(developerRepository, times(1)).findById(1L);
    }

    @Test
    void testGetDeveloperById_NotFound() {
        when(developerRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> developerService.getDeveloperById(99L));
    }

    @Test
    void testCreateDeveloper_Success() {
        when(developerRepository.existsByEmail(sampleDTO.getEmail())).thenReturn(false);
        when(developerRepository.save(any(Developer.class))).thenReturn(sampleDeveloper);

        DeveloperResponseDTO created = developerService.createDeveloper(sampleDTO);

        assertNotNull(created);
        assertEquals("Rahul Sharma", created.getName());
        verify(developerRepository, times(1)).save(any(Developer.class));
    }

    @Test
    void testDeleteDeveloper_Success() {
        when(developerRepository.findById(1L)).thenReturn(Optional.of(sampleDeveloper));
        doNothing().when(developerRepository).delete(sampleDeveloper);

        developerService.deleteDeveloper(1L);

        verify(developerRepository, times(1)).delete(sampleDeveloper);
    }
}
