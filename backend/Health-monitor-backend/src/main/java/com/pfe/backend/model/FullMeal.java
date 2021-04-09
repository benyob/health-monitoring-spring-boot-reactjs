package com.pfe.backend.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.pfe.backend.model.healthdata.BloodPressure;


@Entity
@Table(name = "full_meals")

public class FullMeal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private float caloriesAmount;
	
	private int upvotes;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "meal_id", referencedColumnName = "id")
	private List<Meal> meals = new ArrayList<>();
	
	public FullMeal(){}
	public FullMeal(float caloriesAmount, int upvotes, List<Meal> meals) {
		super();
		this.caloriesAmount = caloriesAmount;
		this.upvotes = upvotes;
		this.meals = meals;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
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
	public List<Meal> getMeals() {
		return meals;
	}
	public void setMeals(List<Meal> meals) {
		this.meals = meals;
	}
	
	
}