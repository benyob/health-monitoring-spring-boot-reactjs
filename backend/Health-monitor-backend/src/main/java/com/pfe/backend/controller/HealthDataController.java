package com.pfe.backend.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.Notification;
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
import com.pfe.backend.payload.request.RegisterRequest;
import com.pfe.backend.payload.response.MessageResponse;
import com.pfe.backend.repository.NotificationsRepository;
import com.pfe.backend.repository.UserRepository;
import com.pfe.backend.repository.healthdata.BloodPressureRepository;
import com.pfe.backend.repository.healthdata.CaloriesRepository;
import com.pfe.backend.repository.healthdata.CarbohydrateRepository;
import com.pfe.backend.repository.healthdata.CholesterolLevelRepository;
import com.pfe.backend.repository.healthdata.ProteinRepository;
import com.pfe.backend.repository.healthdata.PulseRateRepository;
import com.pfe.backend.repository.healthdata.RespirationRateRepository;
import com.pfe.backend.repository.healthdata.SleepingHoursRepository;
import com.pfe.backend.repository.healthdata.SodiumRepository;
import com.pfe.backend.repository.healthdata.SugarLevelRepository;
import com.pfe.backend.repository.healthdata.TemperatureRepository;
import com.pfe.backend.repository.healthdata.WeightRepository;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/dashboard")
public class HealthDataController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	NotificationsRepository notifiRepo;
	
	@Autowired
	BloodPressureRepository bloodPressuerRepo;

	@Autowired
	SugarLevelRepository SugarLevelRepo;

	@Autowired
	CholesterolLevelRepository CholesterolLevelRepo;

	@Autowired
	RespirationRateRepository RespirationRateRepo;

	@Autowired
	PulseRateRepository PulseRateRepo;

	@Autowired
	TemperatureRepository TemperatureRepo;

	@Autowired
	SleepingHoursRepository SleepingHoursRepo;

	@Autowired
	WeightRepository WeightRepo;

	@Autowired
	CaloriesRepository caloriestRepo;
	@Autowired
	ProteinRepository proteinRepo;
	@Autowired
	CarbohydrateRepository carboRepo;
	@Autowired
	SodiumRepository sodiumRepo;
	
	// ******** CREATE RECORDS ***************
	@PostMapping("/user/{id}/setBloodPressure")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public boolean setBloodPressure(@PathVariable long id, @RequestBody BloodPressure healthData) {

		// get the user
		User user = userRepository.findById(id).orElse(null);
		if (user != null) {
			try {
				user.getDataBloodPressure().add(healthData);
				// save the user
				userRepository.save(user);

				return true;
			} catch (Exception e) {
				return false;
			}

		}
		return false;
	}

	@PostMapping("/user/{id}/{healthdatatype}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public boolean setHealtData(@PathVariable long id, @PathVariable HealthDataType healthdatatype,
			@RequestBody HealthData healthData) {
		float v = ((HealthData) healthData).getValue();
		String n = ((HealthData) healthData).getNote();
		Date d = ((HealthData) healthData).getDate();

		// get the user
		User user = userRepository.findById(id).orElse(null);
		if (user != null) {
			try {
				// add record
				switch (healthdatatype) {
				case SugarLevels:
					user.getDataSugarLevel().add(new SugarLevel(v, n, d));
					break;
				case RespirationRate:
					user.getDataRespirationRate().add(new RespirationRate(v, n, d));
					break;

				case CholesterolLevels:
					user.getDataCholesterolLevel().add(new CholesterolLevel(v, n, d));
					break;

				case PulseRate:
					user.getDataPulseRate().add(new PulseRate(v, n, d));
					break;

				case SleepingHours:
					user.getDataSleepingHours().add(new SleepingHours(v, n, d));
					break;

				case Temperature:
					user.getDataTemperature().add(new Temperature(v, n, d));
					break;

				case Weight:
					user.getDataWeight().add(new Weight(v, n, d));
					break;

				case Calories:
					user.getDataCalories().add(new Calories(v, n, d));
					break;

				case Carbohydrate:
					user.getDataCarbohydrate().add(new Carbohydrate(v, n, d));
					break;
				case Protein:
					user.getDataProtein().add(new Protein(v, n, d));
					break;
				case Sodium:
					user.getDataSodium().add(new Sodium(v, n, d));
					break;

				default:
					return false;

				}

				// save the user
				userRepository.save(user);

				return true;
			} catch (Exception e) {
				System.out.println(e.getMessage());
				return false;
			}

		}
		return false;
	}

	// ******** UPDATE RECORDS ***************
	@PutMapping("/user/updateBloodPressure")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public boolean updateBloodPressure(@RequestBody BloodPressure bloodPressure) {
		BloodPressure s = bloodPressuerRepo.findById(bloodPressure.getId()).orElse(null);
		if (s != null) {
			bloodPressuerRepo.save(bloodPressure);
			return true;
		} else
			return false;

	}

	@PutMapping("/user/update/{healthdatatype}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public boolean updateHealthData(@PathVariable HealthDataType healthdatatype, @RequestBody HealthData healthData) {
//		float v = ((HealthData)healthData).getValue();
//		String n = ((HealthData)healthData).getNote();
//		Date d = ((HealthData)healthData).getDate();
		long id = healthData.getId();

		try {
			// add the record
			switch (healthdatatype) {
			case SugarLevels:
				SugarLevel s = SugarLevelRepo.findById(id).orElse(null);
				if (s != null) {
					s.update(healthData);
					SugarLevelRepo.save(s);
				} else
					return false;
				break;
			case RespirationRate:
				RespirationRate s2 = RespirationRateRepo.findById(id).orElse(null);
				if (s2 != null) {
					s2.update(healthData);
					RespirationRateRepo.save(s2);
				} else
					return false;
				break;
			case PulseRate:
				PulseRate s3 = PulseRateRepo.findById(id).orElse(null);
				if (s3 != null) {
					s3.update(healthData);
					PulseRateRepo.save(s3);
				} else
					return false;
				break;
			case SleepingHours:
				SleepingHours s4 = SleepingHoursRepo.findById(id).orElse(null);
				if (s4 != null) {
					s4.update(healthData);
					SleepingHoursRepo.save(s4);
				} else
					return false;
				break;
			case CholesterolLevels:
				CholesterolLevel s5 = CholesterolLevelRepo.findById(id).orElse(null);
				if (s5 != null) {
					s5.update(healthData);
					CholesterolLevelRepo.save(s5);
				} else
					return false;
				break;
			case Temperature:
				Temperature s6 = TemperatureRepo.findById(id).orElse(null);
				if (s6 != null) {
					s6.update(healthData);
					TemperatureRepo.save(s6);
				} else
					return false;
				break;
			case Weight:
				Weight s7 = WeightRepo.findById(id).orElse(null);
				if (s7 != null) {
					s7.update(healthData);
					WeightRepo.save(s7);
				} else
					return false;
				break;
			case Protein:
				Protein s8 = proteinRepo.findById(id).orElse(null);
				if (s8  != null) {
					s8 .update(healthData);
					proteinRepo.save(s8 );
				} else
					return false;
				break;
			case Sodium:
				Sodium s9 = sodiumRepo.findById(id).orElse(null);
				if (s9 != null) {
					s9.update(healthData);
					sodiumRepo.save(s9);
				} else
					return false;
				break;
			case Calories:
				Calories s10 = caloriestRepo.findById(id).orElse(null);
				if (s10 != null) {
					s10.update(healthData);
					caloriestRepo.save(s10);
				} else
					return false;
				break;
			case Carbohydrate:
				Carbohydrate s11 = carboRepo.findById(id).orElse(null);
				if (s11 != null) {
					s11.update(healthData);
					carboRepo.save(s11);
				} else
					return false;
				break;
			default:
				return false;

			}
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}

	}

	// ***** DELETE RECORDS**********//
	@DeleteMapping("/user/delete/{healthdatatype}/{record_id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public void deleteHealthData(@PathVariable HealthDataType healthdatatype, @PathVariable long record_id) {
		// delete the record
		switch (healthdatatype) {
		case BloodPressure:
			bloodPressuerRepo.deleteById(record_id);
			break;
		case SugarLevels:
			SugarLevelRepo.deleteById(record_id);
			break;
		case RespirationRate:
			;
			RespirationRateRepo.deleteById(record_id);

			break;
		case PulseRate:

			PulseRateRepo.deleteById(record_id);

			break;
		case SleepingHours:

			SleepingHoursRepo.deleteById(record_id);

			break;
		case CholesterolLevels:
			CholesterolLevelRepo.deleteById(record_id);

			break;
		case Temperature:

			TemperatureRepo.deleteById(record_id);

			break;
		case Weight:
			WeightRepo.deleteById(record_id);
			break;
			
		case Protein:
			proteinRepo.deleteById(record_id);
			
			break;
		case Sodium:
			sodiumRepo.deleteById(record_id);
			
			break;
		case Calories:
		 caloriestRepo.deleteById(record_id);
	
			break;
		case Carbohydrate:
			carboRepo.deleteById(record_id);
	
			break;
		default:
			break;
		}
	}

	@GetMapping("/admin/resetdata/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public boolean resetUserData(@PathVariable Long id) {
		try {
			User u = userRepository.findById(id).orElse(null);
			if(null != u) {
				List<Long> i = new ArrayList<Long>();
				
				//---
				i=u.healthDataIds(HealthDataType.BloodPressure);
				u.Clear(HealthDataType.BloodPressure);
				userRepository.save(u);
				bloodPressuerRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.Calories);
				u.Clear(HealthDataType.Calories);
				userRepository.save(u);
				caloriestRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.Carbohydrate);
				u.Clear(HealthDataType.Carbohydrate);
				userRepository.save(u);
				carboRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.CholesterolLevels);
				u.Clear(HealthDataType.CholesterolLevels);
				userRepository.save(u);
				CholesterolLevelRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.Protein);
				u.Clear(HealthDataType.Protein);
				userRepository.save(u);
				proteinRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.PulseRate);
				u.Clear(HealthDataType.PulseRate);
				userRepository.save(u);
				PulseRateRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.RespirationRate);
				u.Clear(HealthDataType.RespirationRate);
				userRepository.save(u);
				RespirationRateRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.SleepingHours);
				u.Clear(HealthDataType.SleepingHours);
				userRepository.save(u);
				SleepingHoursRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.Sodium);
				u.Clear(HealthDataType.Sodium);
				userRepository.save(u);
				sodiumRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.SugarLevels);
				u.Clear(HealthDataType.SugarLevels);
				userRepository.save(u);
				SugarLevelRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.Temperature);
				u.Clear(HealthDataType.Temperature);
				userRepository.save(u);
				TemperatureRepo.deleteByIdIn(i);
				
				//---
				i=u.healthDataIds(HealthDataType.Weight);
				u.Clear(HealthDataType.Weight);
				userRepository.save(u);
				WeightRepo.deleteByIdIn(i);
				
				//---
				i.clear();
				for (Notification n : u.getNotifications()) {
					i.add(n.getId());
				}
				u.getNotifications().clear();
				userRepository.save(u);
				notifiRepo.deleteByIdIn(i);
				
				
				
			}
			return true;
		} catch (Exception e) {
			System.err.println(e.getMessage());
			return false;
		}
	}
}
