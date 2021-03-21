package com.pfe.backend.model.healthdata;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.User;
import com.sun.istack.NotNull;

@Entity
public class BloodPressure extends HealthData{
	@NotNull
	private float value2;
	
	// this should be omitted in case records are being added successfuly
//	@ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//	public BloodPressure() {
//	}
//
//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}
	public BloodPressure() {}
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
