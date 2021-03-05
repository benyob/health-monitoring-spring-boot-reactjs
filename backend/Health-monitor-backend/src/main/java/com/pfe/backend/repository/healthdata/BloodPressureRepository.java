package com.pfe.backend.repository.healthdata;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.healthdata.BloodPressure;

@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long>{

}
