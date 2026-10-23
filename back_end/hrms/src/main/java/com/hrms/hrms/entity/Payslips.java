package com.hrms.hrms.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payslips")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payslips {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "payslip_id")
	private Integer payslipId; 
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
	private Employees employeeId;
	
	@Column(name = "month", nullable = false)
	private Integer month;
	
	@Column(name = "year", nullable = false)
	private Integer year;
	
	@Column(name = "basic_pay", nullable = false)
	private BigDecimal basicPay;
	
	@Column(name = "allowances")
	private BigDecimal allowances = BigDecimal.ZERO;;
	
	@Column(name = "deductions")
	private BigDecimal deductions = BigDecimal.ZERO;;
	
	@Column(name = "net_pay",insertable = false, updatable = false)
	private BigDecimal netPay;
	
	@Column(name = "payment_status")
	private String paymentStatus = "Pending";
	
	
	
}
