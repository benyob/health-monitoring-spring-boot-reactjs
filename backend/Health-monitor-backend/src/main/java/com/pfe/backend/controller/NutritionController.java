package com.pfe.backend.controller;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
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

import com.pfe.backend.model.FullMeal;
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
	public void setMeal(@RequestBody List<Meal> meals)
	{
		for (Meal m : meals) {
			
		if(!mealRepository.existsByDescription(m.getDescription()))
			{
				mealRepository.save(m);
			}
		}
	}
	
	public List <FullMeal> generateFullMeal(){
		
		List<Float> arr = new ArrayList<Float>();
		arr.add(1f);
		arr.add(2f);
		arr.add(3f);
		arr.add(4f);
		arr.add(5f);
		arr.add(6f);
		arr.add(7f);
		arr.add(8f);
		arr.add(9f);
		int T = 13;
		Hashtable<Float, Float> hash = new Hashtable<>();
		for (int i = 0; i < arr.size(); i++) {
			hash.put(arr.get(i), (float)i);
		}
		for (int i = 0; i < arr.size(); i++) {
			hash.put(arr.get(i), (float)i);
			if (hash.get(T - arr.get(i))  != i ) {
				System.out.println("pair"+ i +" "+ hash.get(T - arr.get(i))+" has sum "+ T);
			}
		}
		return null;
		/*
		 for (i=0 i<arr.length - 1 ;i++)
{
 hash(arr[i]) = i  // key is the element and value is its index.
}

for (i=0 i<arr.length - 1; i++)
{
 if (hash(T - arr[i]) != i ) // if T - ele exists and is different we found a pair
   print "pair i , hash(T - arr[i]) has sum T"
 
}
*/
	}
}
	

