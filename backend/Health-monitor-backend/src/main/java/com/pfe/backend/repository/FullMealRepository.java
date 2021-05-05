package com.pfe.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.FullMeal;
import com.pfe.backend.model.Meal;
import com.pfe.backend.model.Role;
import com.pfe.backend.model.RoleType;

@Repository
public interface FullMealRepository extends JpaRepository<FullMeal, Long> {
	public List<FullMeal> findByCaloriesAmountBetweenOrderByUpvotesDesc(Float startCaloriesAmount, Float endCaloriesAmount);

}
