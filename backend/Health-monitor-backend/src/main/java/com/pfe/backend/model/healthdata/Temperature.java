
package com.pfe.backend.model.healthdata;

import javax.persistence.Entity;

import com.pfe.backend.model.HealthData;

@Entity
public class Temperature extends HealthData{

	public Temperature() {

	}

	public Temperature(float value, String note) {
		super(value, note);
		// TODO Auto-generated constructor stub
	}
	
}