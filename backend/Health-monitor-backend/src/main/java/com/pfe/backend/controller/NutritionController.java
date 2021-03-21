package com.pfe.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.Meal;
import com.pfe.backend.model.User;
import com.pfe.backend.model.healthdata.BloodPressure;
import com.pfe.backend.payload.response.MessageResponse;
import com.pfe.backend.repository.MealRepository;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/nutrition")
public class NutritionController {
	
	@Autowired
	MealRepository mealRepository;
	//save new meal
	
	
	@PostMapping("/meal/add")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public boolean setMeal(@RequestBody Meal meal)
	{
		//add it if it doesnt exist
		if (!mealRepository.existsByName(meal.getName())) {
			mealRepository.save(meal);
			return true;
		}
		return false;
	
	}
	
	//move this to view
	@GetMapping("/meal/{name}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public Meal getMeal(@PathVariable String name)
	{
		return mealRepository.findByName(name).orElse(new Meal());
	}
}
	

