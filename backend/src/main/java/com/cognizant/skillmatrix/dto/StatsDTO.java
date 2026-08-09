package com.cognizant.skillmatrix.dto;

import java.util.Map;

public class StatsDTO {

    private long totalDevelopers;
    private long availableDevelopers;
    private long allocatedDevelopers;
    private double benchPercentage;
    private Map<String, Long> topSkills;

    public StatsDTO() {
    }

    public StatsDTO(long totalDevelopers, long availableDevelopers, long allocatedDevelopers, double benchPercentage, Map<String, Long> topSkills) {
        this.totalDevelopers = totalDevelopers;
        this.availableDevelopers = availableDevelopers;
        this.allocatedDevelopers = allocatedDevelopers;
        this.benchPercentage = benchPercentage;
        this.topSkills = topSkills;
    }

    public long getTotalDevelopers() {
        return totalDevelopers;
    }

    public void setTotalDevelopers(long totalDevelopers) {
        this.totalDevelopers = totalDevelopers;
    }

    public long getAvailableDevelopers() {
        return availableDevelopers;
    }

    public void setAvailableDevelopers(long availableDevelopers) {
        this.availableDevelopers = availableDevelopers;
    }

    public long getAllocatedDevelopers() {
        return allocatedDevelopers;
    }

    public void setAllocatedDevelopers(long allocatedDevelopers) {
        this.allocatedDevelopers = allocatedDevelopers;
    }

    public double getBenchPercentage() {
        return benchPercentage;
    }

    public void setBenchPercentage(double benchPercentage) {
        this.benchPercentage = benchPercentage;
    }

    public Map<String, Long> getTopSkills() {
        return topSkills;
    }

    public void setTopSkills(Map<String, Long> topSkills) {
        this.topSkills = topSkills;
    }
}
