package com.pfe.backend.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;



@Entity
@Table(name = "customized_full_meals")
public class CustomizedFullMeal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String type;
	private float calories;
	
	// ************* full meals *****************
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "customized_fmeals_fmeals", joinColumns = @JoinColumn(name = "customized_full_meal_id"), 
	inverseJoinColumns = @JoinColumn(name = "full_meal_id"))
	private Set<FullMeal> meals = new HashSet<FullMeal>();
	
	public CustomizedFullMeal() {}
	public CustomizedFullMeal(String type, float calories) {
		super();
		this.type = type;
		this.calories = calories;
	}
	
	@Override
	public String toString() {
		String s="";
		s+=type+" : "+calories;
		
		for(FullMeal fm : meals){
			s+="\n"+fm.getTitle();
			for(Meal m : fm.getMeals()){
				s+="["+m.getDescription()+"] ";
			}
		}
		return s;
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public float getCalories() {
		return calories;
	}

	public void setCalories(float calories) {
		this.calories = calories;
	}

	public Set<FullMeal> getMeals() {
		return meals;
	}

	public void setMeals(Set<FullMeal> meals) {
		this.meals = meals;
	}
	
	
	
}
	