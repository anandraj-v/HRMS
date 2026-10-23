package com.hrms.hrms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.hrms.hrms.entity.Clients;
import com.hrms.hrms.entity.Departments;
import com.hrms.hrms.entity.Employees;
import com.hrms.hrms.entity.Payslips;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequestDto {
	
	
    private String firstName;

    
    private String lastName;

    
    private String email;

   
    private String phone;

    private LocalDate hireDate;

    
    private BigDecimal baseSalary;

    private Integer departmentId;
    
    private Integer clientId;
    
    private Integer managerId;
}
