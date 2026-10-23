package com.hrms.hrms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hrms.hrms.dto.EmployeeSummaryDto;
import com.hrms.hrms.dto.PayslipsRequestDto;
import com.hrms.hrms.dto.PayslipsResponseDto;
import com.hrms.hrms.entity.Employees;
import com.hrms.hrms.entity.Payslips;
import com.hrms.hrms.repository.EmployeesRepository;
import com.hrms.hrms.repository.PayslipsRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PayslipService {

	private PayslipsRepository payslipsRepository;

	private final EmployeesRepository employeesRepository;

	public PayslipService(PayslipsRepository payslipsRepository, EmployeesRepository employeesRepository) {
		this.payslipsRepository = payslipsRepository;
		this.employeesRepository = employeesRepository;
	}

	@Transactional
	public PayslipsResponseDto createPayslip(PayslipsRequestDto payslipsRequestDto) {
		Payslips payslip = Payslips.builder().month(payslipsRequestDto.getMonth()).year(payslipsRequestDto.getYear())
				.basicPay(payslipsRequestDto.getBasicPay()).allowances(payslipsRequestDto.getAllowances())
				.deductions(payslipsRequestDto.getDeductions()).netPay(payslipsRequestDto.getNetPay())
				.paymentStatus(payslipsRequestDto.getPaymentStatus()).build();

		setRelationships(payslip, payslipsRequestDto);
		return mapToDto(payslip);
	}

	@Transactional(readOnly = true)
	public List<PayslipsResponseDto> getAllPayslips() {
		return payslipsRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public PayslipsResponseDto getPayslipsById(Integer id) {
		Payslips payslip = payslipsRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Payslip not found with ID: " + id));
		return mapToDto(payslip);
	}
	
	@Transactional
	public PayslipsResponseDto updatedPayslipsById(Integer id, PayslipsRequestDto payslipsRequestDto) {
		Payslips payslip = payslipsRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Payslip not found with ID: " + id));
				
		payslip.setMonth(payslipsRequestDto.getMonth());
		payslip.setYear(payslipsRequestDto.getYear());
		payslip.setBasicPay(payslipsRequestDto.getBasicPay());
		payslip.setAllowances(payslipsRequestDto.getAllowances());
		payslip.setDeductions(payslipsRequestDto.getDeductions());
		payslip.setNetPay(payslipsRequestDto.getNetPay());
		
		setRelationships(payslip,payslipsRequestDto);
		return mapToDto(payslip);
	}
	
	@Transactional
    public void deletePayslip(Integer id) {
        if (!payslipsRepository.existsById(id)) {
            throw new EntityNotFoundException("Payslips not found with ID: " + id);
        }
        payslipsRepository.deleteById(id);
    }

	private void setRelationships(Payslips payslip, PayslipsRequestDto payslipsRequestDto) {
		if (payslipsRequestDto.getEmployeeId() != null) {
			Employees empId = employeesRepository.findById(payslipsRequestDto.getEmployeeId())
					.orElseThrow(() -> new EntityNotFoundException(
							"Employee not found with ID: " + payslipsRequestDto.getEmployeeId()));
			payslip.setEmployeeId(empId);
		} else {
			payslip.setEmployeeId(null);
		}

	}

	private PayslipsResponseDto mapToDto(Payslips payslips) {

		EmployeeSummaryDto employee = payslips.getEmployeeId() != null ? EmployeeSummaryDto.builder()
				.employeeId(payslips.getEmployeeId().getEmployeeId()).firstName(payslips.getEmployeeId().getFirstName())
				.lastName(payslips.getEmployeeId().getLastName()).email(payslips.getEmployeeId().getEmail()).build()
				: null;

		return PayslipsResponseDto.builder().payslipId(payslips.getPayslipId()).EmployeeId(employee)
				.month(payslips.getMonth()).year(payslips.getYear()).basicPay(payslips.getBasicPay())
				.allowances(payslips.getAllowances()).deductions(payslips.getDeductions()).netPay(payslips.getNetPay())
				.paymentStatus(payslips.getPaymentStatus()).build();

	}
}
