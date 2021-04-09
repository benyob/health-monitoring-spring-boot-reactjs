package com.pfe.backend.repository.healthdata;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.healthdata.SugarLevel;

@Repository
public interface SugarLevelRepository extends JpaRepository<SugarLevel, Long>{
//	public List<SugarLevel> findAllByUserId(long userId);
}
