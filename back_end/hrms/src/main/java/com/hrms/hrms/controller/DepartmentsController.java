package com.hrms.hrms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.hrms.dto.DepartmentsRequestDto;
import com.hrms.hrms.dto.DepartmentsResponseDto;
import com.hrms.hrms.service.DepartmentService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/departments")
public class DepartmentsController {

	private DepartmentService departmentService;

	public DepartmentsController(DepartmentService departmentService) {
		
		this.departmentService = departmentService;
	}
	
	@PostMapping
	public ResponseEntity<DepartmentsResponseDto> createDepartment(@RequestBody DepartmentsRequestDto departmentsRequestDto){
		DepartmentsResponseDto department = departmentService.createDepartment(departmentsRequestDto);
		return new ResponseEntity<>(department, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<DepartmentsResponseDto>> getAllDepartments(){
		List<DepartmentsResponseDto> allDepartments = departmentService.getAllDepartments();
		return ResponseEntity.ok(allDepartments);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<DepartmentsResponseDto> getDepartmentById(@PathVariable Integer id){
		DepartmentsResponseDto departmentById = departmentService.getDepartmentById(id);
		return ResponseEntity.ok(departmentById);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<DepartmentsResponseDto> updateDepartment(@PathVariable Integer id, @RequestBody DepartmentsRequestDto departmentsRequestDto ){
		DepartmentsResponseDto department = departmentService.updateDepartment(id, departmentsRequestDto);
		return ResponseEntity.ok(department);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDepartment(@PathVariable Integer id) {
		departmentService.deleteDepartment(id);
		return ResponseEntity.noContent().build();
		
	}
}
