package com.pfe.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Future;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.Notification;
import com.pfe.backend.model.NotificationType;
import com.pfe.backend.model.healthdata.BloodPressure;

@Service
public class NotificationsService {
	@Async
	public Future<Notification> getNotification2(List<HealthData> latest_recs, HealthDataType healthDataType,
			float refMin, float refMax) throws InterruptedException {
		float sum = 0; // sum of values
		float avg = 0; // average
		float min = latest_recs.get(0).getValue(); // default value for min
		float max = latest_recs.get(0).getValue(); // default value for max
		// get min and max values
		for (int j = 0; j < latest_recs.size(); j++) {
			float value = latest_recs.get(j).getValue();
			if (value < min)
				min = value;
			else if (value > max)
				max = value;
			sum += value;
		}
		// calculate average
		avg = sum / latest_recs.size();
		float avgRef = (refMax + refMin) / 2;

		Notification n = null;
		String a, b, c, d, e;
		switch (healthDataType) {
		case SugarLevels:
			a = "Your Sugar Levels are VERY LOW! Eat something that has about 15 grams (g) of carbohydrates. Examples are:"
					+ "3 glucose tablets"
					+ "One half cup (4 ounces or 237 mL) of fruit juice or regular, non-diet soda";
			b = "Your Sugar Levels are VERY HIGHT! Drink more water ,Exercise more";
			c = "Your Sugar Levels are decreasing ,try a piece of fruit, like a banana, apple, or orange.\r\n"
					+ "Or 2 tablespoons of raisins.\r\n" + "Or 15 grapes.";
			d = "Your Sugar Levels are increasing ,";
			e = "You are doing Great !!";
			n = notify(min, max, refMin, refMax, avg, avgRef, a, b, c, d, e);
			if (n == null)
				return new AsyncResult<>(null);

			n.setStartId(latest_recs.get(latest_recs.size() - 1).getId());
			n.setEndId(latest_recs.get(0).getId());
			n.setTargetHealthDataType(healthDataType);

			return new AsyncResult<>(n);
		default:
			a = "Your Levels are VERY LOW!";
			b = "Your Levels are VERY HIGHT!";
			c = "Your Levels are decreasing";
			d = "Your Levels are increasing ,";
			e = "You are doing Great !!";
			n = notify(min, max, refMin, refMax, avg, avgRef, a, b, c, d, e);
			if (n == null)
				return new AsyncResult<>(null);

			n.setStartId(latest_recs.get(latest_recs.size() - 1).getId());
			n.setEndId(latest_recs.get(0).getId());
			n.setTargetHealthDataType(healthDataType);

			return new AsyncResult<>(n);

		}
	}
	
	// Blood Pressrure
		@Async
		public Future<Notification> getNotificationBloodPressure2(List<BloodPressure> latest5data, float refMinSyst, float refMinDiast,
				float refMaxSyst, float refMaxDiast) throws InterruptedException {


			float sumSyst = 0; // sum of values
			float sumDiast = 0;
			float avgSyst = 0; // average
			float avgDiast = 0;
			float minSyst = latest5data.get(0).getValue(); // default value for min
			float maxSyst = latest5data.get(0).getValue(); // default value for max
			float minDiast = latest5data.get(0).getValue2();
			float maxDiast = latest5data.get(0).getValue2();
			// get min and max values
			for (int j = 0; j < latest5data.size(); j++) {
				float value = latest5data.get(j).getValue();
				float value2 = latest5data.get(j).getValue2();
				// Systolic
				if (value < minSyst)
					minSyst = value;
				else if (value > maxSyst)
					maxSyst = value;
				sumSyst += value;

				// diastolic
				if (value2 < minDiast)
					minDiast = value2;
				else if (value2 > maxDiast)
					maxDiast = value2;
				sumDiast += value2;
			}
			// calculate average
			avgSyst = sumSyst / latest5data.size();
			avgDiast = sumDiast / latest5data.size();

			float avgRefSyst = 120;
			float avgRefDiast = 80;

			// to string
//			String s = "Blood Pressure" + " ,start id = " + records.get(records.size() - 1).getId() + " ,end id = "
//					+ records.get(0).getId() + " ,sumSyst = " + sumSyst+ " ,sumDiast = " + sumDiast + " ,avgSyst = " + avgSyst+ " ,avgDiast= " + avgDiast + " ,(minSyst | maxSyst) = (" + minSyst + " | " + maxSyst
//					+ ")"+ " ,(minDiast| maxDiast) = (" + minDiast+ " | " + maxDiast+ ")" + " ,refAvgSyst = " + avgRefSyst+ " ,refAvgDiast= " + avgRefDiast;
//			System.out.println(s);

			// send notification according to evaluation
			String a, b, c, d, e;

			c = "Your Blood Pressure Levels Are decreasing !";
			d = "Your Blood Pressure Levels Are increasing !";
			e = "You are doing great ,here's a tip : *tip";
			//
			

			if (avgSyst < avgRefSyst - avgRefSyst * 0.2f || avgDiast < avgRefDiast - avgRefDiast * 0.2f) {
				Notification n = new Notification();
				n.setType(NotificationType.Advice);
				n.setContent(c);
				n.setStartId(latest5data.get(latest5data.size() - 1).getId());
				n.setEndId(latest5data.get(0).getId());
				n.setTargetHealthDataType(HealthDataType.BloodPressure);
				return new AsyncResult<>(n);
			} else if (avgSyst > avgRefSyst + avgRefSyst * 0.2f || avgDiast > avgRefDiast + avgRefDiast * 0.2f) {
				Notification n = new Notification();			
				n.setType(NotificationType.Advice);
				n.setContent(d);
				n.setStartId(latest5data.get(latest5data.size() - 1).getId());
				n.setEndId(latest5data.get(0).getId());
				n.setTargetHealthDataType(HealthDataType.BloodPressure);
				return new AsyncResult<>(n);

			}

			else if ((avgSyst > avgRefSyst - avgRefSyst * 0.2f && avgSyst < avgRefSyst + avgRefSyst * 0.2f)
					|| (avgDiast > avgRefDiast - avgRefDiast * 0.2f && avgDiast < avgRefDiast + avgRefDiast * 0.2f)) {
				Notification n = new Notification();
				n.setType(NotificationType.Message);
				n.setContent(e);
				n.setStartId(latest5data.get(latest5data.size() - 1).getId());
				n.setEndId(latest5data.get(0).getId());
				n.setTargetHealthDataType(HealthDataType.BloodPressure);
				return new AsyncResult<>(n);

			} 
			//

		

			return new AsyncResult<>(null);

		}

	
		// ----------------v1
	@Async
	public Future<Notification> getNotificationBloodPressure(List data, float refMinSyst, float refMinDiast,
			float refMaxSyst, float refMaxDiast) throws InterruptedException {

		// see if we already send a notification about it ,
		// get last 5 or less records
		int nbrOfProccessedRecords = 5;
		List<BloodPressure> records = new ArrayList<BloodPressure>();
		List<BloodPressure> prevRecords = data;

		for (int i = prevRecords.size() - 1; i >= 0; i--) {
			records.add(prevRecords.get(i));
			nbrOfProccessedRecords--;
			if (nbrOfProccessedRecords <= 0)
				break;
		}

		// evaluate them
		if (records.size() < 5)
			return new AsyncResult<>(null);

		float sumSyst = 0; // sum of values
		float sumDiast = 0;
		float avgSyst = 0; // average
		float avgDiast = 0;
		float minSyst = records.get(0).getValue(); // default value for min
		float maxSyst = records.get(0).getValue(); // default value for max
		float minDiast = records.get(0).getValue2();
		float maxDiast = records.get(0).getValue2();
		// get min and max values
		for (int j = 0; j < records.size(); j++) {
			float value = records.get(j).getValue();
			float value2 = records.get(j).getValue2();
			// Systolic
			if (value < minSyst)
				minSyst = value;
			else if (value > maxSyst)
				maxSyst = value;
			sumSyst += value;

			// diastolic
			if (value2 < minDiast)
				minDiast = value2;
			else if (value2 > maxDiast)
				maxDiast = value2;
			sumDiast += value2;
		}
		// calculate average
		avgSyst = sumSyst / records.size();
		avgDiast = sumDiast / records.size();

		float avgRefSyst = 120;
		float avgRefDiast = 80;

		// to string
//		String s = "Blood Pressure" + " ,start id = " + records.get(records.size() - 1).getId() + " ,end id = "
//				+ records.get(0).getId() + " ,sumSyst = " + sumSyst+ " ,sumDiast = " + sumDiast + " ,avgSyst = " + avgSyst+ " ,avgDiast= " + avgDiast + " ,(minSyst | maxSyst) = (" + minSyst + " | " + maxSyst
//				+ ")"+ " ,(minDiast| maxDiast) = (" + minDiast+ " | " + maxDiast+ ")" + " ,refAvgSyst = " + avgRefSyst+ " ,refAvgDiast= " + avgRefDiast;
//		System.out.println(s);

		// send notification according to evaluation
		String a, b, c, d, e;

		c = "Your Blood Pressure Levels Are decreasing !";
		d = "Your Blood Pressure Levels Are increasing !";
		e = "You are doing great ,here's a tip : *tip";
		//
		Notification n = new Notification();
//
//			if (minSyst < refMinSyst || minDiast < refMinDiast) {
//				n.setType(NotificationType.Warning);
//				n.setContent(a);
//				
//			}
//			else if (maxSyst > refMaxSyst || maxDiast > refMaxDiast) {
//				n.setType(NotificationType.Warning);
//				n.setContent(b);
//			}
//			else
		if (avgSyst < avgRefSyst - avgRefSyst * 0.2f || avgDiast < avgRefDiast - avgRefDiast * 0.2f) {
			n.setType(NotificationType.Advice);
			n.setContent(c);
		} else if (avgSyst > avgRefSyst + avgRefSyst * 0.2f || avgDiast > avgRefDiast + avgRefDiast * 0.2f) {
			n.setType(NotificationType.Advice);
			n.setContent(d);

		}

		else if ((avgSyst > avgRefSyst - avgRefSyst * 0.2f && avgSyst < avgRefSyst + avgRefSyst * 0.2f)
				|| (avgDiast > avgRefDiast - avgRefDiast * 0.2f && avgDiast < avgRefDiast + avgRefDiast * 0.2f)) {
			n.setType(NotificationType.Message);
			n.setContent(e);

		} else {
			n = null;
		}
		//

		if (n == null)
			return new AsyncResult<>(null);

		n.setStartId(records.get(records.size() - 1).getId());
		n.setEndId(records.get(0).getId());
		n.setTargetHealthDataType(HealthDataType.BloodPressure);

		return new AsyncResult<>(n);

	}
	
	@Async
	public Future<Notification> getNotification(List data, HealthDataType healthDataType, float refMin, float refMax)
			throws InterruptedException {

		// see if we already send a notification about it ,
		// get last 5 or less records
		int nbrOfProccessedRecords = 5;
		List<HealthData> records = new ArrayList<HealthData>();
		List<HealthData> prevRecords = data;

		for (int i = prevRecords.size() - 1; i >= 0; i--) {
			records.add(prevRecords.get(i));
			nbrOfProccessedRecords--;
			if (nbrOfProccessedRecords <= 0)
				break;
		}


		// evaluate them
		if (records.size() < 5)
			return new AsyncResult<>(null);

		float sum = 0; // sum of values
		float avg = 0; // average
		float min = records.get(0).getValue(); // default value for min
		float max = records.get(0).getValue(); // default value for max
		// get min and max values
		for (int j = 0; j < records.size(); j++) {
			float value = records.get(j).getValue();
			if (value < min)
				min = value;
			else if (value > max)
				max = value;
			sum += value;
		}
		// calculate average
		avg = sum / records.size();
		float avgRef = (refMax + refMin) / 2;

		// to string
//		String s = "Blood Pressure" + " ,start id = " + records.get(records.size() - 1).getId() + " ,end id = "
//				+ records.get(0).getId() + " ,sum = " + sum + " ,avg = " + avg + " ,(min | max) = (" + min + " | " + max
//				+ ")" + " ,refAvg = " + avgRef;
//		System.out.println(s);

		// send notification according to evaluation

		Notification n = null;
		String a, b, c, d, e;
		switch (healthDataType) {
		case SugarLevels:
			a = "Your Sugar Levels are VERY LOW! Eat something that has about 15 grams (g) of carbohydrates. Examples are:"
					+ "3 glucose tablets"
					+ "One half cup (4 ounces or 237 mL) of fruit juice or regular, non-diet soda";
			b = "Your Sugar Levels are VERY HIGHT! Drink more water ,Exercise more";
			c = "Your Sugar Levels are decreasing ,try a piece of fruit, like a banana, apple, or orange.\r\n"
					+ "Or 2 tablespoons of raisins.\r\n" + "Or 15 grapes.";
			d = "Your Sugar Levels are increasing ,";
			e = "You are doing Great !!";
			n = notify(min, max, refMin, refMax, avg, avgRef, a, b, c, d, e);
			if (n == null)
				return new AsyncResult<>(null);

			n.setStartId(records.get(records.size() - 1).getId());
			n.setEndId(records.get(0).getId());
			n.setTargetHealthDataType(healthDataType);

			return new AsyncResult<>(n);
		default:
			a = "Your Levels are VERY LOW!";
			b = "Your Levels are VERY HIGHT!";
			c = "Your Levels are decreasing";
			d = "Your Levels are increasing ,";
			e = "You are doing Great !!";
			n = notify(min, max, refMin, refMax, avg, avgRef, a, b, c, d, e);
			if (n == null)
				return new AsyncResult<>(null);

			n.setStartId(records.get(records.size() - 1).getId());
			n.setEndId(records.get(0).getId());
			n.setTargetHealthDataType(healthDataType);

			return new AsyncResult<>(n);

		}
	}

	private Notification notify(float min, float max, float rmin, float rmax, float avg, float avgRef, String a,
			String b, String c, String d, String e) {
		/*
		 * Rules <a> if min < refMin :warning what to do to fix it <b> if max > refMax :
		 * warning what to do fix it <c> if avg < refAvg-20%ravg : advice to increase
		 * <d> if avg > refAvg+20%ravg : advice to decrease <e> if refAvg-20% < avg <
		 * refAvg+20% : alert doing great + some random health fact
		 */

		if (avg < avgRef - avgRef * 0.2f) {
			Notification n = new Notification();
			n.setType(NotificationType.Advice);
			n.setContent(c);
			return n;
		}
		if (avg > avgRef + avgRef * 0.2f) {
			Notification n = new Notification();
			n.setType(NotificationType.Advice);
			n.setContent(d);
			return n;
		}

		if (avg > avgRef - avgRef * 0.2f && avg < avgRef + avgRef * 0.2f) {
			Notification n = new Notification();
			n.setType(NotificationType.Message);
			n.setContent(e);
			return n;
		}

		return null;
	}

	
}
