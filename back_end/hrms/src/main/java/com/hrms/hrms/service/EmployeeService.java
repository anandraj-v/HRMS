package com.hrms.hrms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hrms.hrms.dto.ClientSummaryDto;
import com.hrms.hrms.dto.DepartmentSummaryDto;
import com.hrms.hrms.dto.EmployeeRequestDto;
import com.hrms.hrms.dto.EmployeeResponseDto;
import com.hrms.hrms.dto.EmployeeSummaryDto;
import com.hrms.hrms.dto.PayslipsSummaryDto;
import com.hrms.hrms.entity.Clients;
import com.hrms.hrms.entity.Departments;
import com.hrms.hrms.entity.Employees;
import com.hrms.hrms.repository.ClientsRepository;
import com.hrms.hrms.repository.DepartmentsRepository;
import com.hrms.hrms.repository.EmployeesRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EmployeeService {

	private final EmployeesRepository employeesRepository;
	private final DepartmentsRepository departmentsRepository;
    private final ClientsRepository clientsRepository;
    
    public EmployeeService(EmployeesRepository employeesRepository, DepartmentsRepository departmentsRepository,
			ClientsRepository clientsRepository) {
		
		this.employeesRepository = employeesRepository;
		this.departmentsRepository = departmentsRepository;
		this.clientsRepository = clientsRepository;
	}
    
    @Transactional
    public EmployeeResponseDto createEmployee(EmployeeRequestDto requestDto) {
        if (employeesRepository.existsByEmail(requestDto.getEmail())) {
            throw new IllegalArgumentException("Employee with email " + requestDto.getEmail() + " already exists.");
        }

        Employees employee = Employees.builder()
                .firstName(requestDto.getFirstName())
                .lastName(requestDto.getLastName())
                .email(requestDto.getEmail())
                .phone(requestDto.getPhone())
                .hireDate(requestDto.getHireDate())
                .baseSalary(requestDto.getBaseSalary())
                .build();

        setRelationships(employee, requestDto);

        Employees savedEmployee = employeesRepository.save(employee);
        return mapToDto(savedEmployee);
    }

    @Transactional(readOnly = true)
    public List<EmployeeResponseDto> getAllEmployees() {
        return employeesRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EmployeeResponseDto getEmployeeById(Integer id) {
        Employees employee = employeesRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with ID: " + id));
        return mapToDto(employee);
    }

    @Transactional
    public EmployeeResponseDto updateEmployee(Integer id, EmployeeRequestDto requestDto) {
        Employees employee = employeesRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with ID: " + id));

        employee.setFirstName(requestDto.getFirstName());
        employee.setLastName(requestDto.getLastName());
        employee.setEmail(requestDto.getEmail());
        employee.setPhone(requestDto.getPhone());
        employee.setHireDate(requestDto.getHireDate());
        employee.setBaseSalary(requestDto.getBaseSalary());

        setRelationships(employee, requestDto);

        Employees updatedEmployee = employeesRepository.save(employee);
        return mapToDto(updatedEmployee);
    }

    @Transactional
    public void deleteEmployee(Integer id) {
        if (!employeesRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee not found with ID: " + id);
        }
        employeesRepository.deleteById(id);
    }

    
    private void setRelationships(Employees employee, EmployeeRequestDto requestDto) {
        if (requestDto.getDepartmentId() != null) {
            Departments department = departmentsRepository.findById(requestDto.getDepartmentId())
                    .orElseThrow(() -> new EntityNotFoundException("Department not found with ID: " + requestDto.getDepartmentId()));
            employee.setDepartment(department);
        } else {
            employee.setDepartment(null);
        }

        if (requestDto.getClientId() != null) {
            Clients client = clientsRepository.findById(requestDto.getClientId())
                    .orElseThrow(() -> new EntityNotFoundException("Client not found with ID: " + requestDto.getClientId()));
            employee.setClient(client);
        } else {
            employee.setClient(null);
        }

        if (requestDto.getManagerId() != null) {
            Employees manager = employeesRepository.findById(requestDto.getManagerId())
                    .orElseThrow(() -> new EntityNotFoundException("Manager not found with ID: " + requestDto.getManagerId()));
            employee.setManager(manager);
        } else {
            employee.setManager(null);
        }
    }

    
    private EmployeeResponseDto mapToDto(Employees employee) {
        DepartmentSummaryDto deptDto = employee.getDepartment() != null ?
                DepartmentSummaryDto.builder()
                        .departmentId(employee.getDepartment().getDepartmentId())
                        .departmentName(employee.getDepartment().getDepartmentName())
                        .build() : null;

        ClientSummaryDto clientDto = employee.getClient() != null ?
                ClientSummaryDto.builder()
                        .clientId(employee.getClient().getClientId())
                        .clientName(employee.getClient().getClientName())
                        .industry(employee.getClient().getIndustry())
                        .build() : null;

        EmployeeSummaryDto managerDto = employee.getManager() != null ?
                EmployeeSummaryDto.builder()
                        .employeeId(employee.getManager().getEmployeeId())
                        .firstName(employee.getManager().getFirstName())
                        .lastName(employee.getManager().getLastName())
                        .email(employee.getManager().getEmail())
                        .build() : null;

        List<EmployeeSummaryDto> subDtos = employee.getSubordinates() != null ?
                employee.getSubordinates().stream()
                        .map(sub -> EmployeeSummaryDto.builder()
                                .employeeId(sub.getEmployeeId())
                                .firstName(sub.getFirstName())
                                .lastName(sub.getLastName())
                                .email(sub.getEmail())
                                .build())
                        .collect(Collectors.toList()) : null;

        List<PayslipsSummaryDto> payslipDtos = employee.getPayslips() != null ?
        			
              employee.getPayslips().stream()
                        .map(p -> PayslipsSummaryDto.builder()
                                .payslipId(p.getPayslipId())
                                .month(p.getMonth())
                                .year(p.getYear())
                                .basicPay(p.getBasicPay())
                                .allowances(p.getAllowances())
                                .deductions(p.getDeductions())
                                .netPay(p.getNetPay())
                                .paymentStatus(p.getPaymentStatus())
                                .build())
                        			.collect(Collectors.toList()) : null;

        return EmployeeResponseDto.builder()
                .employeeId(employee.getEmployeeId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .hireDate(employee.getHireDate())
                .baseSalary(employee.getBaseSalary())
                .department(deptDto)
                .client(clientDto)
                .manager(managerDto)
                .subordinates(subDtos)
                .payslips(payslipDtos)
                .build();
    }
}
