package com.pfe.backend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {
	@Id
	@GeneratedValue
	private long id;
	
	
	@Column
	private String content;
	
	@Column
	private Date date = new Date();

	@Column
	private boolean dismissed=false;
	
	


	//id of first record the evaluation started from
	@Column
	private long startId;
	
	//id of last record the evaluation started from
	@Column
	private long endId;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 25)
	private NotificationType type;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 25)
	private HealthDataType targetHealthDataType;
	
	public Notification() {}


	public Notification(String content, long startId, long endId, NotificationType type,
			HealthDataType targetHealthDataType) {
		super();
		this.content = content;
		this.startId = startId;
		this.endId = endId;
		this.type = type;
		this.targetHealthDataType = targetHealthDataType;
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public NotificationType getType() {
		return type;
	}
	public boolean isDismissed() {
		return dismissed;
	}



	public void setDismissed(boolean dismissed) {
		this.dismissed = dismissed;
	}

	public void setType(NotificationType type) {
		this.type = type;
	}

	public HealthDataType getTargetHealthDataType() {
		return targetHealthDataType;
	}

	public void setTargetHealthDataType(HealthDataType targetHealthDataType) {
		this.targetHealthDataType = targetHealthDataType;
	}



	public long getStartId() {
		return startId;
	}



	public void setStartId(long startId) {
		this.startId = startId;
	}



	public long getEndId() {
		return endId;
	}



	public void setEndId(long endId) {
		this.endId = endId;
	}
	
	
}
