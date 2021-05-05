package com.pfe.backend.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.backend.model.FloatValue;
import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.Notification;
import com.pfe.backend.model.NotificationType;
import com.pfe.backend.model.User;
import com.pfe.backend.model.healthdata.BloodPressure;
import com.pfe.backend.repository.FloatValueRepository;
import com.pfe.backend.repository.NotificationsRepository;
import com.pfe.backend.repository.UserRepository;
import com.pfe.backend.service.NotificationsService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController2 {

	@Autowired
	NotificationsService notifServ;
	@Autowired
	UserRepository userRepo;
	@Autowired
	NotificationsRepository notRepo;

	@Autowired
	FloatValueRepository valsRepo;

	@GetMapping("/notify2/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Notification> getNotifications(@PathVariable long id) throws InterruptedException, ExecutionException {
		User u = userRepo.findById(id).orElse(null);
		List<Notification> notifications = new ArrayList<Notification>();
		if (u != null) {
			generateNotification(id, notifications, u.getDataSugarLevel(), HealthDataType.SugarLevels,
					getRefValue("SugarLevels_Min"), getRefValue("SugarLevels_Max"));
			generateNotification(id, notifications, u.getDataCholesterolLevel(), HealthDataType.CholesterolLevels,
					getRefValue("CholesterolLevels_Min"), getRefValue("CholesterolLevels_Max"));
			generateNotification(id, notifications, u.getDataPulseRate(), HealthDataType.PulseRate,
					getRefValue("PulseRate_Min"), getRefValue("PulseRate_Max"));
			generateNotification(id, notifications, u.getDataRespirationRate(), HealthDataType.RespirationRate,
					getRefValue("RespirationRate_Min"), getRefValue("RespirationRate_Max"));
			generateNotification(id, notifications, u.getDataSleepingHours(), HealthDataType.SleepingHours,
					getRefValue("SleepingHours_Min"), getRefValue("SleepingHours_Max"));
			generateNotification(id, notifications, u.getDataTemperature(), HealthDataType.Temperature,
					getRefValue("Temperature_Min"), getRefValue("Temperature_Max"));
			generateNotification(id, notifications, u.getDataWeight(), HealthDataType.Weight, getRefValue("Weight_Min"),
					getRefValue("Weight_Max"));
			// blood pressure
			generateNotificationBloodPressure(id, notifications, u.getDataBloodPressure(),
					getRefValue("BloodPressureSyst_Min"), getRefValue("BloodPressureDiast_Min"),
					getRefValue("BloodPressureSyst_Max"), getRefValue("BloodPressureDiast_Max"));
			
			//
			generateNotification(id, notifications, u.getDataProtein(), HealthDataType.Protein, getRefValue("Protein_Min"),
					getRefValue("Protein_Max"));
			generateNotification(id, notifications, u.getDataSodium(), HealthDataType.Sodium, getRefValue("Sodium_Min"),
					getRefValue("Sodium_Max"));
			generateNotification(id, notifications, u.getDataCarbohydrate(), HealthDataType.Carbohydrate, getRefValue("Carbohydrate_Min"),
					getRefValue("Carbohydrate_Max"));
			generateNotification(id, notifications, u.getDataCalories(), HealthDataType.Calories, getRefValue("Calories_Min"),
					getRefValue("Calories_Max"));

		}
		return notifications;
	}

	@SuppressWarnings("unchecked")
	public void generateNotification(long id, List<Notification> notifications, List<?> prevData, HealthDataType d_type,
			float refMin, float refMax) throws InterruptedException, ExecutionException {
//		System.out.println("hd_tupy :" + d_type + " rmin" + refMin + " rmax" + refMax);
		User u = userRepo.findById(id).orElse(null);
		if (u == null)
			return;
		if (prevData.size() <= 0)
			return;
		Future<Notification> future;
		// get last notification
		Notification last_notif = notRepo.findTop1ByTargetHealthDataTypeOrderByIdDesc(d_type).orElse(null);
		HealthData last_rec = (HealthData) prevData.get(prevData.size() - 1);
		if (null != last_notif) {
			// check with last record id
			// check danger zone
			if (last_rec.getId() > last_notif.getEndId()) {
				if (last_rec.getValue() < refMin) {

					Notification n = new Notification();
					n.setType(NotificationType.Warning);
					n.setContent("Your Levels are VERY LOW !!");
					n.setStartId(last_rec.getId());
					n.setEndId(last_rec.getId());
					n.setTargetHealthDataType(d_type);

					notifications.add(n);

					u.getNotifications().add(n);
					userRepo.save(u);
					return;
				} else if (last_rec.getValue() > refMax) {

					Notification n = new Notification();
					n.setType(NotificationType.Warning);
					n.setContent("Your Levels are VERY HIGH !!");
					n.setStartId(last_rec.getId());
					n.setEndId(last_rec.getId());
					n.setTargetHealthDataType(d_type);

					notifications.add(n);
					n.setDate(new Date());
					u.getNotifications().add(n);
					userRepo.save(u);
					return;
				}
				// normal ealuation
				// try and get last 5 records
				int nbr_to_evaluate = 5;
				List<HealthData> latest_unevaluatedrecords = new ArrayList<HealthData>();
				for (int i = prevData.size() - 1; i >= 0; i--) {
					HealthData tmp = (HealthData) prevData.get(i);
					if (tmp.getId() > last_notif.getEndId()) {
						latest_unevaluatedrecords.add(tmp);
						if (latest_unevaluatedrecords.size() > nbr_to_evaluate)
							break;
					}
				}
				if (latest_unevaluatedrecords.size() >= 5) {
					
					future = notifServ.getNotification2(latest_unevaluatedrecords, d_type, refMin, refMax);
					Notification n = future.get();
					// recieved a new notification
					if (n != null) {
						// add to user repository
						notifications.add(n);
						n.setDate(new Date());
						u.getNotifications().add(n);
						userRepo.save(u);
					}
				}
			}
		} else {
			// check danger zone
			// normal evaluation

			if (last_rec.getValue() < refMin) {

				Notification n = new Notification();
				n.setType(NotificationType.Warning);
				n.setContent("Your Levels are VERY LOW !!");
				n.setStartId(last_rec.getId());
				n.setEndId(last_rec.getId());
				n.setTargetHealthDataType(d_type);

				notifications.add(n);

				u.getNotifications().add(n);
				userRepo.save(u);
				return;
			} else if (last_rec.getValue() > refMax) {

				Notification n = new Notification();
				n.setType(NotificationType.Warning);
				n.setContent("Your Levels are VERY HIGH !!");
				n.setStartId(last_rec.getId());
				n.setEndId(last_rec.getId());
				n.setTargetHealthDataType(d_type);

				notifications.add(n);
				n.setDate(new Date());
				u.getNotifications().add(n);
				userRepo.save(u);
				return;
			}
			// normal ealuation
			// try and get last 5 records
			int nbr_to_evaluate = 5;
			List<HealthData> latest_unevaluatedrecords = new ArrayList<HealthData>();
			for (int i = prevData.size() - 1; i >= 0; i--) {
				HealthData tmp = (HealthData) prevData.get(i);
				latest_unevaluatedrecords.add(tmp);
				if (latest_unevaluatedrecords.size() > nbr_to_evaluate)
					break;

			}
			if (latest_unevaluatedrecords.size() >= 5) {
				future = notifServ.getNotification2(latest_unevaluatedrecords, d_type, refMin, refMax);
				Notification n = future.get();
				// recieved a new notification
				if (n != null) {
					// add to user repository
					notifications.add(n);
					n.setDate(new Date());
					u.getNotifications().add(n);
					userRepo.save(u);
				}
			}
		}

	}

	@SuppressWarnings("unchecked")
	public void generateNotificationBloodPressure(long id, List<Notification> notifications,
			List<BloodPressure> prevData, float refMinSyst, float refMinDiast, float refMaxSyst, float refMaxDiast) throws InterruptedException, ExecutionException {

		User u = userRepo.findById(id).orElse(null);
		if (u == null)
			return;
		if (prevData.size() <= 0)
			return;
		Future<Notification> future;
		// get last notification
		Notification last_notif = notRepo.findTop1ByTargetHealthDataTypeOrderByIdDesc(HealthDataType.BloodPressure)
				.orElse(null);
		BloodPressure last_rec = prevData.get(prevData.size() - 1);
		if (null != last_notif) {
			// **
			if (last_rec.getId() > last_notif.getEndId()) {

				if (last_rec.getValue() < refMinSyst || last_rec.getValue2() < refMinDiast) {
					Notification n = new Notification();

					n.setType(NotificationType.Warning);
					n.setContent("Your blood pressure values are VERY LOW");
					n.setStartId(last_rec.getId());
					n.setEndId(last_rec.getId());
					n.setTargetHealthDataType(HealthDataType.BloodPressure);

					notifications.add(n);
					n.setDate(new Date());
					u.getNotifications().add(n);
					userRepo.save(u);

				} else if (last_rec.getValue() > refMaxSyst || last_rec.getValue2() > refMaxDiast) {
					Notification n = new Notification();

					n.setType(NotificationType.Warning);
					n.setContent("Your blood pressure values are VERY HIGH");
					n.setStartId(last_rec.getId());
					n.setEndId(last_rec.getId());
					n.setTargetHealthDataType(HealthDataType.BloodPressure);

					notifications.add(n);
					n.setDate(new Date());
					u.getNotifications().add(n);
					userRepo.save(u);
				}
				// normal ealuation
				// try and get last 5 records
				int nbr_to_evaluate = 5;
				List<BloodPressure> latest_unevaluatedrecords = new ArrayList<BloodPressure>();
				for (int i = prevData.size() - 1; i >= 0; i--) {
					BloodPressure tmp = prevData.get(i);
					if (tmp.getId() > last_notif.getEndId()) {
						latest_unevaluatedrecords.add(tmp);
						if (latest_unevaluatedrecords.size() > nbr_to_evaluate)
							break;
					}
				}
				if (latest_unevaluatedrecords.size() >= 5) {
					System.out.println("Normal evaluation :)");
					future = notifServ.getNotificationBloodPressure2(latest_unevaluatedrecords, refMinSyst, refMinDiast,
							refMaxSyst, refMaxDiast);
					Notification n = future.get();
					// recieved a new notification
					if (n != null) {
						// add to user repository
						notifications.add(n);
						n.setDate(new Date());
						u.getNotifications().add(n);
						userRepo.save(u);

					}
				}

			}
			// **
		} else {

			if (last_rec.getValue() < refMinSyst || last_rec.getValue2() < refMinDiast) {
				Notification n = new Notification();

				n.setType(NotificationType.Warning);
				n.setContent("Your blood pressure values are VERY LOW");
				n.setStartId(last_rec.getId());
				n.setEndId(last_rec.getId());
				n.setTargetHealthDataType(HealthDataType.BloodPressure);

				notifications.add(n);
				n.setDate(new Date());
				u.getNotifications().add(n);
				userRepo.save(u);

			} else if (last_rec.getValue() > refMaxSyst || last_rec.getValue2() > refMaxDiast) {
				Notification n = new Notification();

				n.setType(NotificationType.Warning);
				n.setContent("Your blood pressure values are VERY HIGH");
				n.setStartId(last_rec.getId());
				n.setEndId(last_rec.getId());
				n.setTargetHealthDataType(HealthDataType.BloodPressure);

				notifications.add(n);
				n.setDate(new Date());
				u.getNotifications().add(n);
				userRepo.save(u);
			}
			// normal ealuation
			// try and get last 5 records
			int nbr_to_evaluate = 5;
			List<BloodPressure> latest_unevaluatedrecords = new ArrayList<BloodPressure>();
			for (int i = prevData.size() - 1; i >= 0; i--) {
				BloodPressure tmp = prevData.get(i);
				
					latest_unevaluatedrecords.add(tmp);
					if (latest_unevaluatedrecords.size() > nbr_to_evaluate)
						break;
				
			}
			if (latest_unevaluatedrecords.size() >= 5) {
				System.out.println("Normal evaluation :)");
				future = notifServ.getNotificationBloodPressure2(latest_unevaluatedrecords, refMinSyst, refMinDiast,
						refMaxSyst, refMaxDiast);
				Notification n = future.get();
				// recieved a new notification
				if (n != null) {
					// add to user repository
					notifications.add(n);
					n.setDate(new Date());
					u.getNotifications().add(n);
					userRepo.save(u);

				}
			}
		}

	}

	public float getRefValue(String name) {
		FloatValue tmp = valsRepo.findByName(name);

		return tmp != null ? tmp.getValue() : -1;
	}

}
