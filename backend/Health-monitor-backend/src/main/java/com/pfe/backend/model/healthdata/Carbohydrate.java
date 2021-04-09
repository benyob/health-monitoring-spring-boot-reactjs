package com.pfe.backend.model.healthdata;

import java.util.Date;

import javax.persistence.Entity;

import com.pfe.backend.model.HealthData;

@Entity
public class Carbohydrate extends HealthData{

	public Carbohydrate() {

	}

	public Carbohydrate(float value, String note,Date date) {
		super(value, note, date);
		// TODO Auto-generated constructor stub
	}
}