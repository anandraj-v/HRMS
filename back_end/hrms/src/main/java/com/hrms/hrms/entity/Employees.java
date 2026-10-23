package com.hrms.hrms.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employees {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "employee_id")
	private Integer employeeId;
	
	@Column(name = "first_name", nullable = false)
	private String firstName;
	
	@Column(name = "last_name", nullable = false)
	private String lastName;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Column(name = "phone")
	private String phone;
	
	
	@Column(name = "hire_date")
	private LocalDate hireDate;
	
	@Column(name = "base_salary")
	private BigDecimal baseSalary;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Departments department;

  
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Clients client;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Employees manager;

    
    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    private List<Employees> subordinates;

   
    @OneToMany(mappedBy = "employeeId", cascade = CascadeType.ALL)
    private List<Payslips> payslips;
    
}
