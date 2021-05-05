package com.pfe.backend.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.pfe.backend.model.healthdata.BloodPressure;
import com.pfe.backend.model.healthdata.Calories;
import com.pfe.backend.model.healthdata.Carbohydrate;
import com.pfe.backend.model.healthdata.CholesterolLevel;
import com.pfe.backend.model.healthdata.Protein;
import com.pfe.backend.model.healthdata.PulseRate;
import com.pfe.backend.model.healthdata.RespirationRate;
import com.pfe.backend.model.healthdata.SleepingHours;
import com.pfe.backend.model.healthdata.Sodium;
import com.pfe.backend.model.healthdata.SugarLevel;
import com.pfe.backend.model.healthdata.Temperature;
import com.pfe.backend.model.healthdata.Weight;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	@Size(max = 120)
	private String password;

//	// notifications
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<Notification> notifications = new ArrayList<>();

	// ************* ROLES *****************
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	// *********** Health Data ****************//
	// Blood pressure
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<BloodPressure> dataBloodPressure = new ArrayList<>();

	// Sugar Level
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<SugarLevel> dataSugarLevel = new ArrayList<>();

	// pulse rate
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<PulseRate> dataPulseRate = new ArrayList<>();

	// respiration rate
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<RespirationRate> dataRespirationRate = new ArrayList<>();

	// cholesterol Level
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<CholesterolLevel> dataCholesterolLevel = new ArrayList<>();

	// Temperature
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<Temperature> dataTemperature = new ArrayList<>();
	// Weight
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<Weight> dataWeight = new ArrayList<>();
	// Sleeping Hours
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<SleepingHours> dataSleepingHours = new ArrayList<>();

	// Calories
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<Calories> dataCalories = new ArrayList<>();
	// Protein
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<Protein> dataProtein = new ArrayList<>();
	// Carbohydrate
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<Carbohydrate> dataCarbohydrate = new ArrayList<>();
	// Sodium
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private List<Sodium> dataSodium = new ArrayList<>();

	// **************************************************
	public User() {
	}

	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
	//methods
	public boolean isAdmin() {
		for (Role r : roles) {
			if(r.getName()==RoleType.ROLE_ADMIN) return true;
		}
		return false;
	}
	public List<Long> healthDataIds(HealthDataType type){
		List<Long> ids = new ArrayList<Long>();
		
		switch (type) {
		case BloodPressure:
			dataBloodPressure.forEach(e->ids.add(e.getId()));
			break;
		case Calories:
			dataCalories.forEach(e->ids.add(e.getId()));
			break;
		case Carbohydrate:
			dataCarbohydrate.forEach(e->ids.add(e.getId()));
			break;
		case CholesterolLevels:
			dataCholesterolLevel.forEach(e->ids.add(e.getId()));
			break;
		case Protein:
			dataProtein.forEach(e->ids.add(e.getId()));
			break;
		case PulseRate:
			dataPulseRate.forEach(e->ids.add(e.getId()));
			break;
		case RespirationRate:
			dataRespirationRate.forEach(e->ids.add(e.getId()));
			break;
		case SleepingHours:
			dataSleepingHours.forEach(e->ids.add(e.getId()));
			break;
		case Sodium:
			dataSodium.forEach(e->ids.add(e.getId()));
			break;
		case SugarLevels:
			dataSugarLevel.forEach(e->ids.add(e.getId()));
			break;
		case Temperature:
			dataTemperature.forEach(e->ids.add(e.getId()));
			break;
		case Weight:
			dataWeight.forEach(e->ids.add(e.getId()));
			break;
			
		default:
			break;
		}
		
		return ids;
	}
	public void Clear(HealthDataType type) {
		switch (type) {
		case BloodPressure:
			dataBloodPressure.clear();
			break;
		case Calories:
			dataCalories.clear();
			break;
		case Carbohydrate:
			dataCarbohydrate.clear();
			break;
		case CholesterolLevels:
			dataCholesterolLevel.clear();
			break;
		case Protein:
			dataProtein.clear();
			break;
		case PulseRate:
			dataPulseRate.clear();
			break;
		case RespirationRate:
			dataRespirationRate.clear();
			break;
		case SleepingHours:
			dataSleepingHours.clear();
			break;
		case Sodium:
			dataSodium.clear();
			break;
		case SugarLevels:
			dataSugarLevel.clear();
			break;
		case Temperature:
			dataTemperature.clear();
			break;
		case Weight:
			dataWeight.clear();
			break;
			
		default:
			break;
		}
	}
	//setters and getters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public List<BloodPressure> getDataBloodPressure() {
		return dataBloodPressure;
	}

	public void setDataBloodPressure(List<BloodPressure> dataBloodPressure) {
		this.dataBloodPressure = dataBloodPressure;
	}

	public List<SugarLevel> getDataSugarLevel() {
		return dataSugarLevel;
	}

	public void setDataSugarLevel(List<SugarLevel> dataSugarLevel) {
		this.dataSugarLevel = dataSugarLevel;
	}

	public List<PulseRate> getDataPulseRate() {
		return dataPulseRate;
	}

	public void setDataPulseRate(List<PulseRate> dataPulseRate) {
		this.dataPulseRate = dataPulseRate;
	}

	public List<RespirationRate> getDataRespirationRate() {
		return dataRespirationRate;
	}

	public void setDataRespirationRate(List<RespirationRate> dataRespirationRate) {
		this.dataRespirationRate = dataRespirationRate;
	}

	public List<CholesterolLevel> getDataCholesterolLevel() {
		return dataCholesterolLevel;
	}

	public void setDataCholesterolLevel(List<CholesterolLevel> dataCholesterolLevel) {
		this.dataCholesterolLevel = dataCholesterolLevel;
	}

	public List<Temperature> getDataTemperature() {
		return dataTemperature;
	}

	public void setDataTemperature(List<Temperature> dataTemperature) {
		this.dataTemperature = dataTemperature;
	}

	public List<Weight> getDataWeight() {
		return dataWeight;
	}

	public void setDataWeight(List<Weight> dataWeight) {
		this.dataWeight = dataWeight;
	}

	public List<SleepingHours> getDataSleepingHours() {
		return dataSleepingHours;
	}

	public void setDataSleepingHours(List<SleepingHours> dataSleepingHours) {
		this.dataSleepingHours = dataSleepingHours;
	}

	public List<Calories> getDataCalories() {
		return dataCalories;
	}

	public void setDataCalories(List<Calories> dataCalories) {
		this.dataCalories = dataCalories;
	}

	public List<Protein> getDataProtein() {
		return dataProtein;
	}

	public void setDataProtein(List<Protein> dataProtein) {
		this.dataProtein = dataProtein;
	}

	public List<Carbohydrate> getDataCarbohydrate() {
		return dataCarbohydrate;
	}

	public void setDataCarbohydrate(List<Carbohydrate> dataCarbohydrate) {
		this.dataCarbohydrate = dataCarbohydrate;
	}

	public List<Sodium> getDataSodium() {
		return dataSodium;
	}

	public void setDataSodium(List<Sodium> dataSodium) {
		this.dataSodium = dataSodium;
	}

	public List<Notification> getNotifications() {
		return notifications;
	}
	public List<Notification> getUndismissedNotifications(){
		List<Notification> n = new ArrayList<>();
		for (Notification notification : notifications) {
			if(!notification.isDismissed()) n.add(notification);
		}
		return n;
	}
	public void setNotifications(List<Notification> notifications) {
		this.notifications = notifications;
	}



}
