package com.pfe.backend.repository.healthdata;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.healthdata.RespirationRate;


@Repository
public interface RespirationRateRepository extends JpaRepository<RespirationRate, Long>{
	@Transactional
	void deleteByIdIn(List<Long> ids);
}
