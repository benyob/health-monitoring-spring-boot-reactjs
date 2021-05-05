package com.pfe.backend.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

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

import com.pfe.backend.model.CustomizedFullMeal;
import com.pfe.backend.model.FullMeal;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.Meal;
import com.pfe.backend.model.TwoMeals;
import com.pfe.backend.model.User;
import com.pfe.backend.model.healthdata.BloodPressure;
import com.pfe.backend.payload.response.MessageResponse;
import com.pfe.backend.repository.CustomizedFullMealRepository;
import com.pfe.backend.repository.FullMealRepository;
import com.pfe.backend.repository.MealRepository;
import com.pfe.backend.repository.UserRepository;
import com.pfe.backend.response.ResFullMeal;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/nutrition")
public class NutritionController {

	@Autowired
	MealRepository mealRepository;

	@Autowired
	UserRepository userRepo;

	@Autowired
	FullMealRepository fullMealRepo;

	@Autowired
	CustomizedFullMealRepository customizedFMRepo;

	// customized meals
	@PostMapping("/meal/customized/add")
	@PreAuthorize("hasRole('ADMIN')")
	public boolean setCustomizedFullMeal(@RequestBody CustomizedFullMeal customizedFM) {
		//System.out.println(customizedFM.toString());
		try {
			
		// save meals
		customizedFM.getMeals().forEach(fm -> {
			for (Meal m : fm.getMeals()) {
					mealRepository.save(m);
			}
		});

		// save fullmeals
		fullMealRepo.saveAll(customizedFM.getMeals());

		// save customized
		customizedFMRepo.save(customizedFM);
		return true;
		}catch(Exception e) {
			System.err.println("Can not Save Customized full meal");
			return false;
		}
	}

	@GetMapping("/meal/customized/get/{type}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public List<CustomizedFullMeal> setCustomizedFullMeal(@PathVariable String type) {
		return customizedFMRepo.findByType(type);
	}
	// customized meals

	// upvote fullmeal
	@GetMapping("/meal/upvote/{user_id}/{fullmeal_id}/{isupvote}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public boolean upvoteFullMeal(@PathVariable Long user_id, @PathVariable Long fullmeal_id,
			@PathVariable boolean isupvote) {
		FullMeal fm = fullMealRepo.findById(fullmeal_id).orElse(null);
		User u = userRepo.findById(user_id).orElse(null);
		if (fm != null && u != null) {
			if (!fm.getUpvoters().contains(u)) {
				if (isupvote)
					fm.setUpvotes(fm.getUpvotes() + 1);
				else
					fm.setUpvotes(fm.getUpvotes() - 1);
				fm.getUpvoters().add(u);
				fullMealRepo.save(fm);
				return true;
			}
		}
		return false;
	}

	// save new meal
	@PostMapping("/meal/add")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public void setMeal(@RequestBody List<Meal> meals) {
		for (Meal m : meals) {

			if (!mealRepository.existsByDescription(m.getDescription())) {
				mealRepository.save(m);
			}
		}
	}

	// with binary search
	@GetMapping("/meal/generate/{amount}/{margin}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<ResFullMeal> generateFullMeal(@PathVariable float amount, @PathVariable float margin) {
		// System.err.println("Desired Ammount : "+amount);
		// check database
		List<FullMeal> fullMeals = fullMealRepo.findByCaloriesAmountBetweenOrderByUpvotesDesc(amount - margin,
				amount + margin);
		if (fullMeals.size() > 0)
			return FMealToResFMeal(fullMeals);

		// if not in db ,generate new ones

		if (margin < 0)
			margin = 0;
		List<String> Pairs = new ArrayList<String>();
		List<Meal> sortedMeals = mealRepository.findAllByOrderByEnergyAsc();
		List<FullMeal> generatedPairs = new ArrayList<FullMeal>();

		for (int i = 0; i < sortedMeals.size(); i++) {
			Meal curr = sortedMeals.get(i);
			int indx = binarySearch(sortedMeals, 0, amount - curr.getEnergy(), margin);
			if (-1 != indx) {
				// debug
				Pairs.add(curr.getDescription() + " | " + sortedMeals.get(indx).getDescription() + "/"
						+ curr.getEnergy() + "+" + sortedMeals.get(indx).getEnergy() + "="
						+ (curr.getEnergy() + sortedMeals.get(indx).getEnergy()));
				// endDebug
				float _amount = (curr.getEnergy() + sortedMeals.get(indx).getEnergy());
				Meal comp = sortedMeals.get(indx);
				// if fullmeal doesnt exist ,add it
				FullMeal _fmeal = new FullMeal();
				_fmeal.setCaloriesAmount(_amount);
				_fmeal.setUpvotes(0);
				_fmeal.getMeals().add(curr);
				_fmeal.getMeals().add(comp);
				if (!ListContainsFullMeal(generatedPairs, _fmeal)) {
					generatedPairs.add(_fmeal);
				}
			}
		}
		// for (String s : Pairs) {
		// System.out.println("☻ "+s);
		// }
////		for (FullMeal fullMeal : generatedPairs) {
////			System.out.println("**"+fullMeal.m1.getDescription()+"-id:"+fullMeal.m1.getId()+
////					" | "+fullMeal.m2.getDescription()+"-id:"+fullMeal.m2.getId());
////		}
		// System.out.println(generatedPairs.size());
//		for (FullMeal fm : generatedPairs) {
//			System.out.println(fm.ToString());
//		}
//		
		// save and return stuff
		fullMealRepo.saveAll(generatedPairs);
		return FMealToResFMeal(generatedPairs);

	}

	boolean ListContainsFullMeal(List<FullMeal> list, FullMeal _fm) {

		for (int i = 0; i < list.size(); i++) {
			FullMeal tmp = list.get(i);
			if (_fm.getMeals().containsAll(tmp.getMeals()))
				return true;
		}
		return false;
	}

	int binarySearch(List<Meal> arr, int startIndx, float x, float margin) {
		int l = startIndx, r = arr.size() - 1;
		while (l <= r) {
			int m = l + (r - l) / 2;

			// Check if x is present at mid
			if (arr.get(m).getEnergy() <= x + margin && arr.get(m).getEnergy() >= x - margin)
				return m;

			// If x greater, ignore left half
			if (arr.get(m).getEnergy() < x)
				l = m + 1;

			// If x is smaller, ignore right half
			else
				r = m - 1;
		}

		// if we reach here, then element was
		// not present
		return -1;
	}

	public List<ResFullMeal> FMealToResFMeal(List<FullMeal> list) {
		List<ResFullMeal> newList = new ArrayList<ResFullMeal>();

		for (FullMeal fm : list) {
			ResFullMeal rfm = new ResFullMeal();
			rfm.setCaloriesAmount(fm.getCaloriesAmount());
			rfm.setUpvotes(fm.getUpvotes());
			rfm.setMeals(fm.getMeals());
			rfm.setId(fm.getId());
			for (User u : fm.getUpvoters()) {
				rfm.getUpvoters().add(u.getId());

			}
			newList.add(rfm);
		}
		return newList;
	}

}
