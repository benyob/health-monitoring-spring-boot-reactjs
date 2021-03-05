package com.pfe.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.backend.model.Meal;
import com.pfe.backend.repository.MealRepository;

@Service
public class NutritionService {
	
	@Autowired
	MealRepository mealRepository;
	
	public List<Meal> getRecomendedMeal()
	{
		return null;
	}
	
	public String searchFoodData(String name)
	{
		return "";
	}
	
	public void addMeal(Meal meal)
	{
		mealRepository.save(meal);
	}
	
}
