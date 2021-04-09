package com.pfe.backend.view;



import java.util.ArrayList;
import java.util.List;

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
public class NutritionView {
	
	@Autowired
	MealRepository mealRepository;
	//save new meal
	
	//move this to view
	@GetMapping("/meal/{description}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Meal> getMeal(@PathVariable String description)
	{
		List<Meal> meals = new ArrayList<Meal>();
		
		mealRepository.findAll().forEach(m->{
			
			if(m.getDescription().toLowerCase().contains(description.toLowerCase())) {
				meals.add(m);
			}
			
		});
		
		return meals;
	}
	
	
		
}
	

