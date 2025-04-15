package com.hotel.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.hotel.entity.Role;
import com.hotel.enums.ERole;
import com.hotel.repository.RoleRepository;

@Component
public class RoleInitializer implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public void run(String... args) throws Exception {
		initializeRoles();
	}

	private void initializeRoles() {

		if (!roleRepository.existsByName(ERole.ROLE_USER)) {
			roleRepository.save(new Role(ERole.ROLE_USER));
		}
		if (!roleRepository.existsByName(ERole.ROLE_ADMIN)) {
			roleRepository.save(new Role(ERole.ROLE_ADMIN));
		}
		if(!roleRepository.existsByName(ERole.ROLE_CUSTOMER)) {
			roleRepository.save(new Role(ERole.ROLE_CUSTOMER));
		}

	}
}
