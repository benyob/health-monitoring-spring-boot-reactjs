
package com.pfe.backend.model.healthdata;

import javax.persistence.Entity;

import com.pfe.backend.model.HealthData;

@Entity
public class CholesterolLevel extends HealthData{

	public CholesterolLevel() {

	}

	public CholesterolLevel(float value, String note) {
		super(value, note);
		// TODO Auto-generated constructor stub
	}
}