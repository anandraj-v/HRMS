package com.hrms.hrms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.hrms.hrms.entity.Employees;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayslipsRequestDto {

	//private Integer payslipId; 

	private Integer employeeId;
	
	private Integer month;
	
	private Integer year;
	
	private BigDecimal basicPay;
	
	private BigDecimal allowances ;
	
	private BigDecimal deductions;

	private BigDecimal netPay;

	private String paymentStatus;
}
