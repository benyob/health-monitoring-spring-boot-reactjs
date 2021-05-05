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
public class NotificationController {

	@Autowired
	NotificationsService notifServ;
	@Autowired
	UserRepository userRepo;
	@Autowired
	NotificationsRepository notRepo;

	@Autowired
	FloatValueRepository valsRepo;

	@GetMapping("/dismiss/{notf_id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public void dismissNotification(@PathVariable long notf_id) {

		Notification n = notRepo.findById(notf_id).orElse(null);
		if (n != null) {
			n.setDismissed(true);
			notRepo.save(n);
		}
	}

	public void generateNotification(long id, List<Notification> notifications, List prevData,
			HealthDataType h_data_type, float refMin, float refMax) {
		// System.out.println(h_data_type + " => rmin: " + refMin + ", rmax : " +
		// refMax);
		// check user
		User u = userRepo.findById(id).orElse(null);
		if (u == null)
			return;
		if (prevData.size() <= 0)
			return;
		Future<Notification> future;
		// get type notifications
		try {
			// last notification
			Notification n_tmp = null;

			// list of all notifications of this user
			List<Notification> prevNotifications = u.getNotifications();

			// get last record id

			long lastId = ((List<HealthData>) prevData).get(prevData.size() - 1).getId();
			// chech if record value is dangerous
			// check for very high or very low

			float value = ((List<HealthData>) prevData).get(prevData.size() - 1).getValue();
			// System.out.println("las id : " + lastId);
			// get last notification
			for (int i = prevNotifications.size() - 1; i >= 0; i--) {
				if (prevNotifications.get(i).getTargetHealthDataType() == h_data_type) {
					n_tmp = prevNotifications.get(i);
					break;
				}
			}
			if (n_tmp != null) {
				System.out.println("Found one");
				if (lastId > n_tmp.getEndId()) {

					if (value < refMin) {

						Notification n = new Notification();
						n.setType(NotificationType.Warning);
						n.setContent("Your Levels are VERY LOW !!");
						n.setStartId(lastId);
						n.setEndId(lastId);
						n.setTargetHealthDataType(h_data_type);

						notifications.add(n);

						u.getNotifications().add(n);
						userRepo.save(u);
						return;
					} else if (value > refMax) {

						Notification n = new Notification();
						n.setType(NotificationType.Warning);
						n.setContent("Your Levels are VERY HIGH !!");
						n.setStartId(lastId);
						n.setEndId(lastId);
						n.setTargetHealthDataType(h_data_type);

						notifications.add(n);
						n.setDate(new Date());
						u.getNotifications().add(n);
						userRepo.save(u);
						return;
					}
				}
				// compare id with endId of last notification
				if (lastId > n_tmp.getEndId() + 5) {
					// get new notifications
					future = notifServ.getNotification(prevData, h_data_type, refMin, refMax);
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

				// no notification about sugar level exists yet ,get new one
			} else {
				System.out.println("NOT Found one");
				System.err.println("FIRST " + h_data_type);
				if (value < refMin) {

					Notification n = new Notification();
					n.setType(NotificationType.Warning);
					n.setContent("Your Levels are VERY LOW !!");
					n.setStartId(lastId);
					n.setEndId(lastId);
					n.setTargetHealthDataType(h_data_type);

					notifications.add(n);

					u.getNotifications().add(n);
					userRepo.save(u);
					return;
				} else if (value > refMax) {

					Notification n = new Notification();
					n.setType(NotificationType.Warning);
					n.setContent("Your Levels are VERY HIGH !!");
					n.setStartId(lastId);
					n.setEndId(lastId);
					n.setTargetHealthDataType(h_data_type);

					notifications.add(n);
					n.setDate(new Date());
					u.getNotifications().add(n);
					userRepo.save(u);
					return;
				}

				future = notifServ.getNotification(prevData, h_data_type, refMin, refMax);
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

			// add to notifactions

		} catch (InterruptedException | ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// add all notifications

	}

	public void generateNotificationBloodPressure(long id, List<Notification> notifications,
			List<BloodPressure> prevData, float refMinSyst, float refMinDiast, float refMaxSyst, float refMaxDiast) {

//		System.out.println("Blood pressure => refMinSyst: " + refMinSyst + ", refMinDiast : " + refMinDiast
//				+ ", refMaxSyst : " + refMaxSyst + ", refMaxDiast : " + refMaxDiast);
		// check user
		User u = userRepo.findById(id).orElse(null);
		if (prevData.isEmpty())
			return;
		if (u != null) {
			Future<Notification> future;
			// get sugar level notifications
			try {
				// last notification about sugar levels
				Notification n_tmp = null;

				// list of all notifications of this user
				List<Notification> prevNotifications = u.getNotifications();
				long lastId = prevData.get(prevData.size() - 1).getId();
				// check if dangereous value
				float syst = prevData.get(prevData.size() - 1).getValue();
				float diast = prevData.get(prevData.size() - 1).getValue2();
				// get last notification
				for (int i = prevNotifications.size() - 1; i >= 0; i--) {
					if (prevNotifications.get(i).getTargetHealthDataType() == HealthDataType.BloodPressure) {
						n_tmp = prevNotifications.get(i);
						break;
					}
				}
				if (n_tmp != null) {
					if (lastId > n_tmp.getEndId()) {
						if (syst < refMinSyst || diast < refMinDiast) {
							Notification n = new Notification();

							n.setType(NotificationType.Warning);
							n.setContent("Your blood pressure values are VERY LOW");
							n.setStartId(lastId);
							n.setEndId(lastId);
							n.setTargetHealthDataType(HealthDataType.BloodPressure);

							notifications.add(n);
							n.setDate(new Date());
							u.getNotifications().add(n);
							userRepo.save(u);

						} else if (syst > refMaxSyst || diast > refMaxDiast) {
							Notification n = new Notification();

							n.setType(NotificationType.Warning);
							n.setContent("Your blood pressure values are VERY HIGH");
							n.setStartId(lastId);
							n.setEndId(lastId);
							n.setTargetHealthDataType(HealthDataType.BloodPressure);

							notifications.add(n);
							n.setDate(new Date());
							u.getNotifications().add(n);
							userRepo.save(u);
						}
					}
					// get last record id

					// compare id with endId of last notification
					if (lastId > n_tmp.getEndId() + 5) {
						// get new notifications
						future = notifServ.getNotificationBloodPressure(prevData, refMinSyst, refMinDiast, refMaxSyst,
								refMaxDiast);
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

					// no notification about sugar level exists yet ,get new one
				} else {
					future = notifServ.getNotificationBloodPressure(prevData, refMinSyst, refMinDiast, refMaxSyst,
							refMaxDiast);
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

				// add to notifactions

			} catch (InterruptedException | ExecutionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			// add all notifications
		}
	}

	@GetMapping("/notify/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Notification> getNotifications(@PathVariable long id) {
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
			generateNotificationBloodPressure(id, notifications, u.getDataBloodPressure(),
					getRefValue("BloodPressureSyst_Min"), getRefValue("BloodPressureDiast_Min"),
					getRefValue("BloodPressureSyst_Max"), getRefValue("BloodPressureDiast_Max"));
			// blood pressure

		}
		return notifications;
	}

	public float getRefValue(String name) {
		FloatValue tmp = valsRepo.findByName(name);

		return tmp != null ? tmp.getValue() : -1;
	}
	// notifServ.getNotificationBloodPressure(u.getDataBloodPressure(),90 ,60 ,140
	// ,90).get();

//	@GetMapping("/notify/{id}")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//	public List<Notification> getntifications(@PathVariable long id) {
//
//		List<Notification> notifications = new ArrayList<Notification>();
//		// check user
//		User u = userRepo.findById(id).orElse(null);
//		if (u != null) {
//			Future<Notification> future;
//			// get sugar level notifications
//			try {
//				// last notification about sugar levels
//				Notification n_tmp = null;
//
//				// list of all notifications of this user
//				List<Notification> prevNotifications = u.getNotifications();
//
//				// get last notification
//				for (int i = prevNotifications.size()-1; i >= 0; i--) {
//					if (prevNotifications.get(i).getTargetHealthDataType() == HealthDataType.SugarLevels) {
//						n_tmp = prevNotifications.get(i);
//						break;
//					}
//				}
//				if (n_tmp != null) {
//
//					// get last record id
//					long lastId = u.getDataSugarLevel().get(u.getDataSugarLevel().size() - 1).getId();
//					// compare id with endId of last notification
//					if (lastId > n_tmp.getEndId()+5) {
//						// get new notifications
//						future = notifServ.getNotification(u.getDataSugarLevel(), HealthDataType.SugarLevels, 4.0f,
//								7.8f);
//						Notification n = future.get();
//						// recieved a new notification
//						if (n != null) {
//							// add to user repository
//							notifications.add(n);
//							u.getNotifications().add(n);
//							userRepo.save(u);
//						}
//
//					}
//
//					// no notification about sugar level exists yet ,get new one
//				} else {
//					future = notifServ.getNotification(u.getDataSugarLevel(), HealthDataType.SugarLevels, 4.0f, 7.8f);
//					Notification n = future.get();
//					// recieved a new notification
//					if (n != null) {
//						// add to user repository
//						notifications.add(n);
//						u.getNotifications().add(n);
//						userRepo.save(u);
//					}
//				}
//
//				// add to notifactions
//
//			} catch (InterruptedException | ExecutionException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			
//			//add all notifications
//		}
//		return notifications;
//	}
//	
//	
//	

	@GetMapping("/notifications/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Notification> getAllntifications(@PathVariable long id) {

		return userRepo.existsById(id) ? userRepo.findById(id).orElse(new User()).getUndismissedNotifications()
				: new ArrayList<>();
	}

}
