package com.pfe.backend.repository.healthdata;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.healthdata.Temperature;

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature, Long>{
	@Transactional
	void deleteByIdIn(List<Long> ids);
}
