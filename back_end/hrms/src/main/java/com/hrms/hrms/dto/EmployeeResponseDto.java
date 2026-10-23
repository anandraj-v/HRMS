package com.hrms.hrms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponseDto {

	private Integer employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate hireDate;
    private BigDecimal baseSalary;

    private DepartmentSummaryDto department;
    private ClientSummaryDto client;
    private EmployeeSummaryDto manager;
    private List<EmployeeSummaryDto> subordinates;
    private List<PayslipsSummaryDto> payslips;
}
