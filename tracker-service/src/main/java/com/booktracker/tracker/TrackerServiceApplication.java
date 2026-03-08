package com.booktracker.tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Tracker Service - Suivi de lecture
 * 
 * @author Mohamed Nacer Hammami
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableFeignClients
public class TrackerServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(TrackerServiceApplication.class, args);
    }
}
