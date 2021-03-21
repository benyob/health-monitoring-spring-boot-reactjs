package com.pfe.backend.controller;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.model.User;
import com.pfe.backend.model.healthdata.BloodPressure;
import com.pfe.backend.payload.response.MessageResponse;
import com.pfe.backend.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/admin/users")
	@PreAuthorize("hasRole('ADMIN')")
	public List<String> getUsers() {
		List<String> users = new ArrayList<String>();
		userRepository.findAll().forEach(u -> users.add("id : "+u.getId()+" | username : "+u.getUsername()+" | email : "+u.getEmail()));
		return users;
	}
	
	@GetMapping("/admin/delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		try {
			userRepository.deleteById(id);
			return ResponseEntity.ok(new MessageResponse("user with id: "+id+" was deleted !"));
		}catch (Exception e) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error deleting user with id:"+id+" ,error message : "+e.getMessage()));
			
		}
		
	}
}

