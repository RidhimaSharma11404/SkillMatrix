package com.cognizant.skillmatrix.config;

import com.cognizant.skillmatrix.entity.Developer;
import com.cognizant.skillmatrix.entity.DeveloperStatus;
import com.cognizant.skillmatrix.entity.ExperienceLevel;
import com.cognizant.skillmatrix.repository.DeveloperRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final DeveloperRepository developerRepository;

    public DataInitializer(DeveloperRepository developerRepository) {
        this.developerRepository = developerRepository;
    }

    @Override
    public void run(String... args) {
        if (developerRepository.count() > 0) {
            return;
        }

        developerRepository.save(createDev(
                "Aarav Patel",
                "aarav.patel@cognizant.com",
                "Senior Java Microservices Engineer",
                ExperienceLevel.SENIOR,
                6,
                new HashSet<>(Arrays.asList("Java", "Spring Boot", "Microservices", "Kafka", "Docker", "PostgreSQL")),
                DeveloperStatus.AVAILABLE,
                null,
                "Bangalore, India",
                "https://api.dicebear.com/7.x/bottts/svg?seed=Aarav"
        ));

        developerRepository.save(createDev(
                "Priya Sharma",
                "priya.sharma@cognizant.com",
                "Full Stack React & Spring Developer",
                ExperienceLevel.MID_LEVEL,
                4,
                new HashSet<>(Arrays.asList("React", "Java", "Spring Boot", "TypeScript", "Tailwind CSS", "REST API")),
                DeveloperStatus.ALLOCATED,
                "HSBC Global Banking Modernization",
                "Hyderabad, India",
                "https://api.dicebear.com/7.x/bottts/svg?seed=Priya"
        ));

        developerRepository.save(createDev(
                "Rohan Kulkarni",
                "rohan.k@cognizant.com",
                "Lead Cloud Solutions Architect",
                ExperienceLevel.TECH_LEAD,
                10,
                new HashSet<>(Arrays.asList("AWS", "Kubernetes", "Spring Cloud", "Terraform", "Java", "CI/CD")),
                DeveloperStatus.ALLOCATED,
                "JPMorgan Cloud Migration",
                "Pune, India",
                "https://api.dicebear.com/7.x/bottts/svg?seed=Rohan"
        ));

        developerRepository.save(createDev(
                "Ananya Iyer",
                "ananya.iyer@cognizant.com",
                "Junior Frontend UI/UX Engineer",
                ExperienceLevel.JUNIOR,
                2,
                new HashSet<>(Arrays.asList("React", "JavaScript", "HTML5", "CSS3", "Redux", "Figma")),
                DeveloperStatus.AVAILABLE,
                null,
                "Chennai, India",
                "https://api.dicebear.com/7.x/bottts/svg?seed=Ananya"
        ));

        developerRepository.save(createDev(
                "Vikram Singh",
                "vikram.singh@cognizant.com",
                "DevOps & Site Reliability Engineer",
                ExperienceLevel.SENIOR,
                7,
                new HashSet<>(Arrays.asList("Docker", "Kubernetes", "Jenkins", "AWS", "Linux", "Prometheus")),
                DeveloperStatus.AVAILABLE,
                null,
                "Bangalore, India",
                "https://api.dicebear.com/7.x/bottts/svg?seed=Vikram"
        ));

        developerRepository.save(createDev(
                "Sneha Reddy",
                "sneha.reddy@cognizant.com",
                "Backend Java API Developer",
                ExperienceLevel.MID_LEVEL,
                3,
                new HashSet<>(Arrays.asList("Java", "Spring Boot", "Hibernate", "MySQL", "JUnit", "Swagger")),
                DeveloperStatus.AVAILABLE,
                null,
                "Hyderabad, India",
                "https://api.dicebear.com/7.x/bottts/svg?seed=Sneha"
        ));

        developerRepository.save(createDev(
                "Aditya Verma",
                "aditya.verma@cognizant.com",
                "Data & AI Integration Specialist",
                ExperienceLevel.MID_LEVEL,
                5,
                new HashSet<>(Arrays.asList("Python", "Java", "FastAPI", "PostgreSQL", "OpenAI API", "Docker")),
                DeveloperStatus.ALLOCATED,
                "Aetna Healthcare AI Claims",
                "Noida, India",
                "https://api.dicebear.com/7.x/bottts/svg?seed=Aditya"
        ));

        System.out.println(">>> [SkillMatrix] Successfully seeded 7 sample enterprise developer profiles.");
    }

    private Developer createDev(
            String name,
            String email,
            String role,
            ExperienceLevel level,
            int yoe,
            Set<String> skills,
            DeveloperStatus status,
            String project,
            String location,
            String avatar
    ) {
        Developer dev = new Developer();
        dev.setName(name);
        dev.setEmail(email);
        dev.setRole(role);
        dev.setExperienceLevel(level);
        dev.setYearsOfExperience(yoe);
        dev.setSkills(skills);
        dev.setStatus(status);
        dev.setCurrentProject(project);
        dev.setLocation(location);
        dev.setAvatarUrl(avatar);
        return dev;
    }
}
