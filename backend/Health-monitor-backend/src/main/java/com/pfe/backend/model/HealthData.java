package com.pfe.backend.model;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import com.sun.istack.NotNull;

@MappedSuperclass
public class HealthData {
	@Id
	@GeneratedValue
	private long id;
	
	@NotNull
	private float value;
	
	private String note;
	private Date date = new Date();
	
	public HealthData() {}
	
	public HealthData(float value, String note) {
		super();
		this.value = value;
		this.note = note;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public float getValue() {
		return value;
	}
	public void setValue(float value) {
		this.value = value;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	
}
