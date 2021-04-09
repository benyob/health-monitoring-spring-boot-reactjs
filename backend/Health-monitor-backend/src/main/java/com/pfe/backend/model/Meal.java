package com.pfe.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "meals")
public class Meal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String description;
	private float protein;
	private float fat;
	private float carbohydrate;
	private float energy;
	private float sugars;
	private float water;

	
	public Meal() {}


	public Meal(String description, float protein, float fat, float carbohydrate, float energy, float sugars,
			float water) {
		super();
		this.description = description;
		this.protein = protein;
		this.fat = fat;
		this.carbohydrate = carbohydrate;
		this.energy = energy;
		this.sugars = sugars;
		this.water = water;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public float getProtein() {
		return protein;
	}


	public void setProtein(float protein) {
		this.protein = protein;
	}


	public float getFat() {
		return fat;
	}


	public void setFat(float fat) {
		this.fat = fat;
	}


	public float getCarbohydrate() {
		return carbohydrate;
	}


	public void setCarbohydrate(float carbohydrate) {
		this.carbohydrate = carbohydrate;
	}


	public float getEnergy() {
		return energy;
	}


	public void setEnergy(float energy) {
		this.energy = energy;
	}


	public float getSugars() {
		return sugars;
	}


	public void setSugars(float sugars) {
		this.sugars = sugars;
	}


	public float getWater() {
		return water;
	}


	public void setWater(float water) {
		this.water = water;
	}


	
	
}