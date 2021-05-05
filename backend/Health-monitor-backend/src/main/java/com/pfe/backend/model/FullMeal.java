package com.pfe.backend.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.pfe.backend.model.healthdata.BloodPressure;


@Entity
@Table(name = "full_meals")

public class FullMeal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private float caloriesAmount;
	
	// snack  ,breakfast ,...
	private String title;
	
	private int upvotes;
	
	
	
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	@JoinColumn(name = "full_meal_id", referencedColumnName = "id")
//	private List<Meal> meals = new ArrayList<>();
//	
	// ************* meals *****************
		@ManyToMany(fetch = FetchType.LAZY)
		@JoinTable(name = "fullmeal_meals", joinColumns = @JoinColumn(name = "full_meal_id"), 
		inverseJoinColumns = @JoinColumn(name = "meal_id"))
		private Set<Meal> meals = new HashSet<Meal>();
	
		@ManyToMany(fetch = FetchType.LAZY)
		@JoinTable(name = "fullmeal_upvoters", joinColumns = @JoinColumn(name = "full_meal_id"), 
		inverseJoinColumns = @JoinColumn(name = "user_id"))
		private Set<User> upvoters = new HashSet<User>();
		
	//methods
	public String ToString() {
		String s="";
		s += "* full meal : "+"Calories : "+caloriesAmount+"\n";
		for (Meal m : meals) {
			s+=""+m.getDescription()+" | ";
		}
		s+="--\n";
		return s;
	}
	
	public FullMeal(){}
	
	
	//methods
//	public boolean ContainMeals(List<Meal> mlist) {
//		//getIds
//		Integer[] mealsIDs = new Integer[meals.size()];
//		for (int i = 0; i < meals.size(); i++) {
//			mealsIDs[i]=meals.get(i).getId();
//		}
//		return Arrays.asList(mealsIDs).containsAll(IDs);
//	}
	
//	boolean ContainMealId(int id) {
//	for (Meal meal : meals) {
//		if(meal.getId()==id) return true;
//	}
//	return false;
//}
public FullMeal(float caloriesAmount, int upvotes, Set<Meal> meals) {
		super();
		this.caloriesAmount = caloriesAmount;
		this.upvotes = upvotes;
		this.meals = meals;
	
	}


	public String getTitle() {
	return title;
}

public void setTitle(String title) {
	this.title = title;
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

	public Set<User> getUpvoters() {
		return upvoters;
	}

	public void setUpvoters(Set<User> upvoters) {
		this.upvoters = upvoters;
	}
	
	
}