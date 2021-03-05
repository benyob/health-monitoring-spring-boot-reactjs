package com.pfe.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.Role;
import com.pfe.backend.model.RoleType;
import com.pfe.backend.model.User;
import com.pfe.backend.model.healthdata.BloodPressure;
import com.pfe.backend.model.healthdata.SugarLevel;
import com.pfe.backend.repository.RoleRepository;
import com.pfe.backend.service.UserService;

@SpringBootApplication
public class HealthMonitorBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(HealthMonitorBackendApplication.class, args);
	}


	// For Testing 
	@Override
	public void run(String... args) throws Exception {

	}

}
