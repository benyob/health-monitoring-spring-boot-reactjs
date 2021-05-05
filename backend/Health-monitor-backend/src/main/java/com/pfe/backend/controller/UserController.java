package com.pfe.backend.controller;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

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

import com.pfe.backend.model.FloatValue;
import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.Role;
import com.pfe.backend.model.RoleType;
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
import com.pfe.backend.payload.response.MessageResponse;
import com.pfe.backend.repository.FloatValueRepository;
import com.pfe.backend.repository.RoleRepository;
import com.pfe.backend.repository.UserRepository;
import com.pfe.backend.response.ResUser;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class UserController {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	FloatValueRepository floatValsRepo;
	
	@Autowired
	RoleRepository roleRepository;

	@GetMapping("/admin/users")
	@PreAuthorize("hasRole('ADMIN')")
	public List<ResUser> getUsers() {

		List<ResUser> users = new ArrayList<ResUser>();
		userRepository.findAll().forEach(u -> {
			
			if (!u.isAdmin()) {
				ResUser r_u = new ResUser();
				r_u.Assign(u);
				users.add(r_u);
			}
			
		});

		return users;

//		("id : "+u.getId()+" | username : "+u.getUsername()+" | email : "+u.getEmail()));
	}

	@GetMapping("/admin/delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public boolean deleteUser(@PathVariable Long id) {
		try {
			userRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	

	@GetMapping("/admin/grantadmin/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public boolean GrantAdmin(@PathVariable Long id) {
		try {
			
		User u = userRepository.findById(id).orElse(null);
		if(u == null) return false;
		
		Role adminRole = roleRepository.findByName(RoleType.ROLE_ADMIN).orElse(null);
		if(adminRole==null) return false;
		u.getRoles().add(adminRole);
		userRepository.save(u);
		return true;
		}catch(Exception e) {
			return false;
		}
	}
	
	// float values

	
	@GetMapping("/admin/getfloatvalues")
	@PreAuthorize("hasRole('ADMIN')")
	public List<FloatValue> GetAllFloatValue() {
		return floatValsRepo.findAll();
	}
	@PostMapping("/admin/setfloatvalues")
	@PreAuthorize("hasRole('ADMIN')")
	public boolean SetFloatValue(@RequestBody FloatValue floatval) {
		return floatValsRepo.save(floatval) == null ?false:true;
	}
	
	@GetMapping("/admin/deletefloatvalue/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public boolean DeleteFloatValue(@PathVariable Long id) {
		try {
			floatValsRepo.deleteById(id);
			return true;		
			}
		catch(Exception e) {
			return false;	
			}
	}
	@GetMapping("/admin/getfloatvaluesshortcut/{type}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public String GetFloatValueShortcut(@PathVariable HealthDataType type) {
		
		switch (type) {
		case SugarLevels:
			return getRefValShorted("SugarLevels_Min" ,"SugarLevels_Max");
			
		case BloodPressure:
			return getRefValShortedBP("BloodPressureSyst_Min",
					"BloodPressureSyst_Max",
					"BloodPressureDiast_Min",
					"BloodPressureDiast_Max");
			
		case RespirationRate:
			return getRefValShorted("RespirationRate_Min" ,"RespirationRate_Max");
		
		case CholesterolLevels:
			return getRefValShorted("CholesterolLevels_Min" ,"CholesterolLevels_Max");

		case PulseRate:
			return getRefValShorted("PulseRate_Min" ,"PulseRate_Max");

		case SleepingHours:
			return getRefValShorted("SleepingHours_Min" ,"SleepingHours_Max");

		case Temperature:
			return getRefValShorted("Temperature_Min" ,"Temperature_Max");

		case Weight:
			return getRefValShorted("Weight_Min" ,"Weight_Max");

		case Calories:
			return getRefValShorted("Calories_Min" ,"Calories_Max");

		case Carbohydrate:
			return getRefValShorted("Carbohydrate_Min" ,"Carbohydrate_Max");
		case Protein:
			return getRefValShorted("Protein_Min" ,"Protein_Max");
		case Sodium:
			return getRefValShorted("Sodium_Min" ,"Sodium_Max");

		default:
			return "n/a";

		}
		
	}
	public String getRefValShorted(String n1 ,String n2) {
		String s="";
		FloatValue fv1 = floatValsRepo.findByName(n1);
		FloatValue fv2 = floatValsRepo.findByName(n2);
		
		float v1 = fv1 != null ? fv1.getValue() : -1;
		float v2 = fv2 != null ? fv2.getValue() : -1;

		String u1 = fv1 != null ? fv1.getUnit() : " n/a";
		String s1 = fv1 != null ? fv1.getSource() : " n/a";

		String u2 = fv2 != null ? fv2.getUnit() : " n/a";
		
		s="Between "+v1+" "+u1+" and "+v2+" "+u1+" <br>Source : "+s1;
		
		return s;
	}
	public String getRefValShortedBP(String s1 ,String d1 ,String s2 ,String d2) {
		String s="";
		FloatValue fvS1 = floatValsRepo.findByName(s1);
		FloatValue fvD1 = floatValsRepo.findByName(d1);
		FloatValue fvS2 = floatValsRepo.findByName(s2);
		FloatValue fvD2 = floatValsRepo.findByName(d2);
		
		float sv1 = fvS1 != null ? fvS1.getValue() : -1;
		float dv1 = fvD1 != null ? fvD1.getValue() : -1;
		float sv2 = fvS2 != null ? fvS2.getValue() : -1;
		float dv2 = fvD2 != null ? fvD2.getValue() : -1;
		
		String tu1 = fvS1 != null ? fvS1.getUnit() : " n/a";
		String ts1 = fvS1 != null ? fvS1.getSource() : " n/a";
		s="Between "+sv1+"/"+dv1+" "+tu1+" and "+sv2+"/"+dv2+" "+tu1+" <br>Source : "+ts1;;
		
	
		
		return s;
	}
	
}
	
