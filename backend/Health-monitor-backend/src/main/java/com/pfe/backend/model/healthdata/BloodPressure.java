package com.pfe.backend.model.healthdata;

import javax.persistence.Entity;

import com.pfe.backend.model.HealthData;
import com.sun.istack.NotNull;

@Entity
public class BloodPressure extends HealthData{
	@NotNull
	private float value2;

	public BloodPressure() {
	}

	public BloodPressure(float value ,float value2, String note) {
		super(value, note);
		// TODO Auto-generated constructor stub
		this.value2 = value2;
	}

	public float getValue2() {
		return value2;
	}

	public void setValue2(float value2) {
		this.value2 = value2;
	}
	
	
}
