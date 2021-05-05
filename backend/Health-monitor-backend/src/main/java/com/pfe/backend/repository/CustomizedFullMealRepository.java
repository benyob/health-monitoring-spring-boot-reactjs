package com.pfe.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.CustomizedFullMeal;
import com.pfe.backend.model.FullMeal;
import com.pfe.backend.model.Meal;
import com.pfe.backend.model.Role;
import com.pfe.backend.model.RoleType;

@Repository
public interface CustomizedFullMealRepository extends JpaRepository<CustomizedFullMeal, Long> {
	public List<CustomizedFullMeal> findByType(String type);

}
