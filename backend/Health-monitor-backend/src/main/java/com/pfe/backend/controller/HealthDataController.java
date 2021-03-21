package com.pfe.backend.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.pfe.backend.model.Role;
import com.pfe.backend.model.RoleType;
import com.pfe.backend.model.User;
import com.pfe.backend.model.healthdata.BloodPressure;
import com.pfe.backend.payload.request.RegisterRequest;
import com.pfe.backend.payload.response.MessageResponse;
import com.pfe.backend.repository.UserRepository;
import com.pfe.backend.repository.healthdata.BloodPressureRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/dashboard")
public class HealthDataController {
	
	@Autowired
	UserRepository userRepository;
	

	//health data endpoint

	@PostMapping("/user/{id}/{healthdatatype}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public boolean setHealthDataBloodPressure(@PathVariable long id,@PathVariable HealthDataType healthdatatype,@RequestBody BloodPressure bloodPressure)
	{
		
		//get the user
		User user = userRepository.findById(id).orElse(null);
		if(user!=null)
		{
			try{
				//add the record
				user.getDataBloodPressure().add(bloodPressure);
				
				//save the user
				userRepository.save(user);
				
				return true;
			}catch (Exception e) {
				return false;
			}
			
		}
		return false;
	}
}
