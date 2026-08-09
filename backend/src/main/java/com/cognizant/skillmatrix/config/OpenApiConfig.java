package com.cognizant.skillmatrix.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SkillMatrix Enterprise API")
                        .version("1.0.0")
                        .description("RESTful APIs for Developer Skill Tracking and Bench Allocation Management built for Cognizant Full-Stack Evaluation")
                        .contact(new Contact()
                                .name("Developer Candidate")
                                .email("developer@cognizant.com"))
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));
    }
}
