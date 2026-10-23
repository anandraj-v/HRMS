package com.hrms.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrms.hrms.entity.Employees;

public interface EmployeesRepository extends JpaRepository<Employees, Integer> {
	
	boolean existsByEmail(String email);
}
