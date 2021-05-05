package com.pfe.backend.repository.healthdata;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.healthdata.BloodPressure;

@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long>{

	@Transactional
	void deleteByIdIn(List<Long> ids);
}
