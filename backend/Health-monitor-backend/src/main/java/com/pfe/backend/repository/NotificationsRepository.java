package com.pfe.backend.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.Notification;
import com.pfe.backend.model.NotificationType;


@Repository
public interface NotificationsRepository extends JpaRepository<Notification, Long> {
	Optional<Notification> findByType(NotificationType type);
	@Transactional
	void deleteByIdIn(List<Long> ids);
	Optional<Notification> findTop1ByTargetHealthDataTypeOrderByIdDesc(HealthDataType type);
	
}
