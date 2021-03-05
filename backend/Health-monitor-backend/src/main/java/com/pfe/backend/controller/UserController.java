package com.pfe.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.backend.model.HealthData;
import com.pfe.backend.model.HealthDataType;
import com.pfe.backend.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/dashboard")
public class UserController {
	
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content from server";
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content from server";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Content from server";
	}
	//health data endpoint
	@Autowired
	UserService userService;
	
	@GetMapping("/user/{id}/{healthdatatype}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<HealthData> getUserHealthData(@PathVariable long id ,@PathVariable HealthDataType healthdatatype)
	{
		return userService.getUserHealthData(id ,healthdatatype);
	}
}

