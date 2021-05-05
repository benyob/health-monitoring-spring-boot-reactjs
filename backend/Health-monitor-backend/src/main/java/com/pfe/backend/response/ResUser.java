package com.pfe.backend.response;

import java.util.HashSet;
import java.util.Set;

import com.pfe.backend.model.Role;
import com.pfe.backend.model.User;

public class ResUser {
	private Long id;
	private String username;
	private String email;
	private Set<Role> roles = new HashSet<>();
	
	public ResUser() {}
	
	public ResUser(String username, String email, Set<Role> roles) {
		super();
		this.username = username;
		this.email = email;
		this.roles = roles;
	}

	public void Assign(User u) {
		id=u.getId();
		username=u.getUsername();
		email=u.getEmail();
		roles=u.getRoles();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	

}
