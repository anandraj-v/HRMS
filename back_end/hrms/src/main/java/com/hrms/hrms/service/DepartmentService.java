package com.hrms.hrms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hrms.hrms.dto.ClientResponseDto;
import com.hrms.hrms.dto.DepartmentsRequestDto;
import com.hrms.hrms.dto.DepartmentsResponseDto;
import com.hrms.hrms.entity.Departments;
import com.hrms.hrms.repository.DepartmentsRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class DepartmentService {

	private final DepartmentsRepository departmentsRepository;
	
	public DepartmentService(DepartmentsRepository departmentsRepository) {
		this.departmentsRepository = departmentsRepository;
	}
	
	@Transactional
	public DepartmentsResponseDto createDepartment(DepartmentsRequestDto departmentsRequestDto) {
		Departments departments = Departments.builder().departmentId(departmentsRequestDto.getDepartmentId())
		.departmentName(departmentsRequestDto.getDepartmentName()).build();
		
		Departments savedDepartment = departmentsRepository.save(departments);
		
		return mapToDto(savedDepartment);
	}
	
	@Transactional(readOnly = true)
    public List<DepartmentsResponseDto> getAllDepartments() {
		return departmentsRepository.findAll().stream()
				.map(this::mapToDto)
				.collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public DepartmentsResponseDto getDepartmentById(Integer id) {
		Departments departments = departmentsRepository.findById(id)
		.orElseThrow(() -> new EntityNotFoundException("department not found with ID: " + id));
		
		return mapToDto(departments);
	}
	
	@Transactional
	public DepartmentsResponseDto updateDepartment(Integer id, DepartmentsRequestDto departmentsRequestDto) {
		Departments department = departmentsRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("department not found with ID: " + id));
		department.setDepartmentName(departmentsRequestDto.getDepartmentName());
		
		Departments updatedDepartments = departmentsRepository.save(department);
		
		return mapToDto(updatedDepartments);
	}
	
	@Transactional
    public void deleteDepartment(Integer id) {
		if(!departmentsRepository.existsById(id)) {
			throw new EntityNotFoundException("department not found with ID: " + id);
		}
		
		departmentsRepository.deleteById(id);
	}
	
	private DepartmentsResponseDto mapToDto(Departments departments) {
		return DepartmentsResponseDto.builder().departmentId(departments.getDepartmentId())
		.departmentName(departments.getDepartmentName()).build();
	}
}
