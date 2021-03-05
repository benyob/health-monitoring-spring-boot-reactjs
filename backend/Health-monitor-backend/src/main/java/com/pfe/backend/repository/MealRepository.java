package com.pfe.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.Meal;

@Repository
public interface MealRepository extends JpaRepository<Meal, Integer> {

}
