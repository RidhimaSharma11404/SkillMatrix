package com.cognizant.skillmatrix.dto;

import jakarta.validation.constraints.NotBlank;

public class AllocationRequestDTO {

    @NotBlank(message = "Project name is required for allocation")
    private String projectName;

    public AllocationRequestDTO() {
    }

    public AllocationRequestDTO(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
}
