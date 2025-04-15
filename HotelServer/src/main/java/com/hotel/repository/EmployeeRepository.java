package com.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotel.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {}
