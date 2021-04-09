package com.pfe.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.Meal;
import com.pfe.backend.model.Role;
import com.pfe.backend.model.RoleType;

@Repository
public interface MealRepository extends JpaRepository<Meal, Integer> {
	
	Boolean existsByDescription(String description);
	Optional<Meal> findByDescription(String description);
}
