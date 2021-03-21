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
			case SugarLevel:
				for (HealthData healthData : user.getDataSugarLevel()) {
					data.add(healthData);
				}
				break;
			default:
				break;
			}
			
			return data;
		
	}
	
}
