package com.pfe.backend.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.Notification;
import com.pfe.backend.model.User;
import com.pfe.backend.model.healthdata.BloodPressure;
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
	
	public void generateNotification(long id ,List<Notification> notifications ,List prevData ,HealthDataType h_data_type ,float refMin, float refMax ) {
		// check user
				User u = userRepo.findById(id).orElse(null);
				if (u != null) {
					Future<Notification> future;
					// get sugar level notifications
					try {
						// last notification about sugar levels
						Notification n_tmp = null;

						// list of all notifications of this user
						List<Notification> prevNotifications = u.getNotifications();

						// get last notification
						for (int i = prevNotifications.size()-1; i >= 0; i--) {
							if (prevNotifications.get(i).getTargetHealthDataType() == h_data_type) {
								n_tmp = prevNotifications.get(i);
								break;
							}
						}
						if (n_tmp != null) {

							// get last record id
							
							long lastId = ((List<HealthData>)prevData).get(prevData.size() - 1).getId();
							// compare id with endId of last notification
							if (lastId > n_tmp.getEndId()+5) {
								// get new notifications
								future = notifServ.getNotification(prevData, h_data_type, refMin,
										refMax);
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
					
					//add all notifications
				}
	}
	public void generateNotificationBloodPressure(long id ,List<Notification> notifications ,List<BloodPressure> prevData ,float refMinSyst ,float refMinDiast, float refMaxSyst ,float refMaxDiast) {
		// check user
				User u = userRepo.findById(id).orElse(null);
				if (u != null) {
					Future<Notification> future;
					// get sugar level notifications
					try {
						// last notification about sugar levels
						Notification n_tmp = null;

						// list of all notifications of this user
						List<Notification> prevNotifications = u.getNotifications();

						// get last notification
						for (int i = prevNotifications.size()-1; i >= 0; i--) {
							if (prevNotifications.get(i).getTargetHealthDataType() == HealthDataType.BloodPressure) {
								n_tmp = prevNotifications.get(i);
								break;
							}
						}
						if (n_tmp != null) {

							// get last record id
							
							long lastId = prevData.get(prevData.size() - 1).getId();
							// compare id with endId of last notification
							if (lastId > n_tmp.getEndId()+5) {
								// get new notifications
								future =notifServ.getNotificationBloodPressure(prevData,  refMinSyst , refMinDiast,  refMaxSyst , refMaxDiast);
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
							future =notifServ.getNotificationBloodPressure(prevData,  refMinSyst , refMinDiast,  refMaxSyst , refMaxDiast);
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
					
					//add all notifications
				}
	}
	@GetMapping("/notify/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Notification> getntifications(@PathVariable long id) {
		User u = userRepo.findById(id).orElse(null);
		List<Notification> notifications = new ArrayList<Notification>();
		if (u != null) {
		generateNotification(id, notifications,u.getDataSugarLevel(), HealthDataType.SugarLevels, 4.0f, 7.8f);
		generateNotification(id, notifications,u.getDataCholesterolLevel(), HealthDataType.CholesterolLevels, 6.66f, 11.1f);
		generateNotification(id, notifications,u.getDataPulseRate(), HealthDataType.PulseRate, 60f, 100f);
		generateNotification(id, notifications,u.getDataRespirationRate(), HealthDataType.RespirationRate, 12f, 20f);
		generateNotification(id, notifications,u.getDataSleepingHours(), HealthDataType.SleepingHours, 6.5f, 8f);
		generateNotification(id, notifications,u.getDataTemperature(), HealthDataType.Temperature, 36.1f, 37.6f);
		generateNotification(id, notifications,u.getDataWeight(), HealthDataType.Weight, 67.9f, 	74.1f);
		generateNotificationBloodPressure(id, notifications ,u.getDataBloodPressure() ,90 ,60 ,140 ,90);
		//blood pressure 
		
		}
		return notifications;
	}
	
	//			notifServ.getNotificationBloodPressure(u.getDataBloodPressure(),90 ,60 ,140 ,90).get();

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
		
		return userRepo.existsById(id)?userRepo.findById(id).orElse(new User()).getNotifications():new ArrayList<>();
	}
	
	

}
