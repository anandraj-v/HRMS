package com.hrms.hrms.dto;

import java.util.List;

import com.hrms.hrms.entity.Employees;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientRequestDto {

	private Integer ClientId;
	
	private String clientName;
	
	private String industry;
	
	private String contactEmail;
	
	private String status;
	
}
