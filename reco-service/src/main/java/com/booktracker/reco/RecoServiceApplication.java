package com.booktracker.reco;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Reco Service - Recommandations et Statistiques
 * 
 * @author Mohamed Nacer Hammami
 */
@SpringBootApplication
@EnableFeignClients
@EnableJpaAuditing
public class RecoServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(RecoServiceApplication.class, args);
    }
}
