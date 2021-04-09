package com.pfe.backend.view;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.User;
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
import com.pfe.backend.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/dashboard")
public class HealthDataView {
	
	@Autowired
	UserRepository userRepository;
	
	//health data endpoint
	@GetMapping("/user/{id}/{healthdatatype}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<HealthData> getUserHealthData(@PathVariable long id ,@PathVariable HealthDataType healthdatatype)
	{
			List<HealthData> data = new ArrayList<>();

			//get user by id
			User user = userRepository.findById(id).orElse(null);
			
			//
			if(user == null) return data;
			
			//get data *not completed
			switch (healthdatatype) {
			case BloodPressure:
				for (HealthData healthData : user.getDataBloodPressure()) {
					data.add(healthData);
				}
				break;
			case SugarLevels:
				for (HealthData healthData : user.getDataSugarLevel()) {
					data.add(healthData);
				}
				break;
			case RespirationRate:
				for (HealthData healthData : user.getDataRespirationRate()) {
					data.add(healthData);
				}
				break;
				
			case CholesterolLevels:
				for (HealthData healthData : user.getDataCholesterolLevel()) {
					data.add(healthData);
				}
				break;
				
			case PulseRate:
				for (HealthData healthData : user.getDataPulseRate()) {
					data.add(healthData);
				}
				break;
				
			case SleepingHours:
				for (HealthData healthData : user.getDataSleepingHours()) {
					data.add(healthData);
				}
				break;
				
			case Temperature:
				for (HealthData healthData : user.getDataTemperature()) {
					data.add(healthData);
				}
				break;
				
			case Weight:
				for (HealthData healthData : user.getDataWeight()) {
					data.add(healthData);
				}
				break;
				
			case Calories:
				for (HealthData healthData : user.getDataCalories()) {
					data.add(healthData);
				}
				break;
				
			case Carbohydrate:
				for (HealthData healthData : user.getDataCarbohydrate()) {
					data.add(healthData);
				}
				break;
			case Protein:
				for (HealthData healthData : user.getDataProtein()) {
					data.add(healthData);
				}
				break;	
			case Sodium:
				for (HealthData healthData : user.getDataSodium()) {
					data.add(healthData);
				}
				break;	
			default:
				break;
			}
			
			return data;
		
	}
	
}
