package com.pfe.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.User;
import com.pfe.backend.repository.UserRepository;
import com.pfe.backend.model.HealthDataType;
@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	public List<HealthData> getUserHealthData(long id ,HealthDataType healthdatatype)
	{
		List<HealthData> data = new ArrayList<>();

		//get user by id
		User user = userRepository.findById(id).orElse(null);
		
		//
		if(user == null) return data;
		
		//get data *no completed
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

