package com.articleplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Article Publishing Platform application.
 */
@SpringBootApplication
public class ArticlePlatformApplication {

    /**
     * Bootstraps the Spring Boot application.
     *
     * @param args command-line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(ArticlePlatformApplication.class, args);
    }
}
