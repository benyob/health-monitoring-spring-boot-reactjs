package com.pfe.backend.repository.healthdata;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.healthdata.PulseRate;

@Repository
public interface PulseRateRepository extends JpaRepository<PulseRate, Long>{

}
