package com.cognizant.skillmatrix.controller;

import com.cognizant.skillmatrix.dto.AllocationRequestDTO;
import com.cognizant.skillmatrix.dto.DeveloperRequestDTO;
import com.cognizant.skillmatrix.dto.DeveloperResponseDTO;
import com.cognizant.skillmatrix.dto.StatsDTO;
import com.cognizant.skillmatrix.entity.DeveloperStatus;
import com.cognizant.skillmatrix.service.DeveloperService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/developers")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@Tag(name = "Developer Skill Matrix", description = "Endpoints for managing developers, skills, and bench allocations")
public class DeveloperController {

    private final DeveloperService developerService;

    public DeveloperController(DeveloperService developerService) {
        this.developerService = developerService;
    }

    @GetMapping
    @Operation(summary = "Get all developers", description = "Fetch developers with optional filters for search keywords, allocation status, and specific skills")
    public ResponseEntity<List<DeveloperResponseDTO>> getAllDevelopers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) DeveloperStatus status,
            @RequestParam(required = false) String skill
    ) {
        List<DeveloperResponseDTO> developers = developerService.getAllDevelopers(search, status, skill);
        return ResponseEntity.ok(developers);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get developer by ID")
    public ResponseEntity<DeveloperResponseDTO> getDeveloperById(@PathVariable Long id) {
        DeveloperResponseDTO developer = developerService.getDeveloperById(id);
        return ResponseEntity.ok(developer);
    }

    @PostMapping
    @Operation(summary = "Create new developer profile")
    public ResponseEntity<DeveloperResponseDTO> createDeveloper(@Valid @RequestBody DeveloperRequestDTO dto) {
        DeveloperResponseDTO created = developerService.createDeveloper(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update developer profile")
    public ResponseEntity<DeveloperResponseDTO> updateDeveloper(
            @PathVariable Long id,
            @Valid @RequestBody DeveloperRequestDTO dto
    ) {
        DeveloperResponseDTO updated = developerService.updateDeveloper(id, dto);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/allocate")
    @Operation(summary = "Allocate developer to a client project")
    public ResponseEntity<DeveloperResponseDTO> allocateDeveloper(
            @PathVariable Long id,
            @Valid @RequestBody AllocationRequestDTO dto
    ) {
        DeveloperResponseDTO updated = developerService.allocateDeveloper(id, dto);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/release")
    @Operation(summary = "Release developer back to the bench (AVAILABLE status)")
    public ResponseEntity<DeveloperResponseDTO> releaseDeveloper(@PathVariable Long id) {
        DeveloperResponseDTO updated = developerService.releaseDeveloper(id);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete developer profile")
    public ResponseEntity<Void> deleteDeveloper(@PathVariable Long id) {
        developerService.deleteDeveloper(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    @Operation(summary = "Get dashboard analytics & KPI stats")
    public ResponseEntity<StatsDTO> getDashboardStats() {
        StatsDTO stats = developerService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
}
