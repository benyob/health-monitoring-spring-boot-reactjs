package com.pfe.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
public class Meal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;
	
	private float calories;
	
	public Meal() {}
	public Meal(String name, float calories) {
		super();
		this.name = name;
		this.calories = calories;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getCalories() {
		return calories;
	}
	public void setCalories(float calories) {
		this.calories = calories;
	}
	
	
}