package com.hrms.hrms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.hrms.dto.EmployeeRequestDto;
import com.hrms.hrms.dto.EmployeeResponseDto;
import com.hrms.hrms.dto.PayslipsRequestDto;
import com.hrms.hrms.dto.PayslipsResponseDto;
import com.hrms.hrms.service.PayslipService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/payslips")
public class PayslipsController {

	private final PayslipService payslipService;
	
	public PayslipsController(PayslipService payslipService) {
		this.payslipService = payslipService;
	}
	
	@PostMapping
    public ResponseEntity<PayslipsResponseDto> createEmployee(@Validated @RequestBody PayslipsRequestDto requestDto) {
       
		PayslipsResponseDto createdPayslip = payslipService.createPayslip(requestDto);
		
        return new ResponseEntity<>(createdPayslip, HttpStatus.CREATED);
    }
	@GetMapping
	public ResponseEntity<List<PayslipsResponseDto>> getAllPayslip(){
		List<PayslipsResponseDto> allPayslips = payslipService.getAllPayslips();
		return ResponseEntity.ok(allPayslips);
	}
	@GetMapping("/{id}")
	public ResponseEntity<PayslipsResponseDto> getPayslipByid(@PathVariable Integer id){
		PayslipsResponseDto payslip = payslipService.getPayslipsById(id);
		return ResponseEntity.ok(payslip);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<PayslipsResponseDto> updatePayslip(@PathVariable Integer id,@Validated @RequestBody PayslipsRequestDto requestDto){
		PayslipsResponseDto updatedPayslip = payslipService.updatedPayslipsById(id, requestDto);
		return ResponseEntity.ok(updatedPayslip);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePayslip(@PathVariable Integer id) {
		payslipService.deletePayslip(id);
		return ResponseEntity.noContent().build();
	}
}
