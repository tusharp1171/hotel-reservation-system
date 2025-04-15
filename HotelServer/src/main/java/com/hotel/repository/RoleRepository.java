package com.hotel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Role;
import com.hotel.enums.ERole;

@Repository
public interface RoleRepository extends JpaRepository<com.hotel.entity.Role, Long> {
	Optional<Role> findByName(ERole name);

	boolean existsByName(ERole name);
}
