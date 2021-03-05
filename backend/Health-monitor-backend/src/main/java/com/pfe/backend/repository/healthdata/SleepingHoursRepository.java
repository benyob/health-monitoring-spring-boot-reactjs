package com.pfe.backend.repository.healthdata;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.healthdata.SleepingHours;

@Repository
public interface SleepingHoursRepository extends JpaRepository<SleepingHours, Long>{

}
