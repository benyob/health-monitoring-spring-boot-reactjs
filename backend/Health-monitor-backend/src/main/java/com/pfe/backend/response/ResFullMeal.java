package com.pfe.backend.response;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.pfe.backend.model.Meal;
import com.pfe.backend.model.FullMeal;
import com.pfe.backend.model.User;
public class ResFullMeal {
private Long id;
	
	private float caloriesAmount;
	
	private int upvotes;
	
	private Set<Meal> meals = new HashSet<Meal>();

	private Set<Long> upvoters = new HashSet<Long>();
	
	public ResFullMeal() {
		
	}
	
	
	public ResFullMeal(Long id, float caloriesAmount, int upvotes, Set<Meal> meals, Set<Long> upvoters) {
		super();
		this.id = id;
		this.caloriesAmount = caloriesAmount;
		this.upvotes = upvotes;
		this.meals = meals;
		this.upvoters = upvoters;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public float getCaloriesAmount() {
		return caloriesAmount;
	}

	public void setCaloriesAmount(float caloriesAmount) {
		this.caloriesAmount = caloriesAmount;
	}

	public int getUpvotes() {
		return upvotes;
	}

	public void setUpvotes(int upvotes) {
		this.upvotes = upvotes;
	}

	public Set<Meal> getMeals() {
		return meals;
	}

	public void setMeals(Set<Meal> meals) {
		this.meals = meals;
	}

	public Set<Long> getUpvoters() {
		return upvoters;
	}

	public void setUpvoters(Set<Long> upvoters) {
		this.upvoters = upvoters;
	}
	
	
}
