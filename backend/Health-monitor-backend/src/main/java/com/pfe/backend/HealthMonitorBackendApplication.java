package com.pfe.backend;


import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.concurrent.Future;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.pfe.backend.model.FullMeal;


@SpringBootApplication
public class HealthMonitorBackendApplication   {

	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	public static void main(String[] args) {
		SpringApplication.run(HealthMonitorBackendApplication.class, args);
	}
}