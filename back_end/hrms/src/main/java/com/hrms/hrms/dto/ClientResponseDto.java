package com.hrms.hrms.dto;

import java.util.List;

import com.hrms.hrms.entity.Clients;
import com.hrms.hrms.entity.Employees;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientResponseDto {

private Integer clientId;
	
	private String clientName;
	
	private String industry;
	
	private String contactEmail;
	
	private String status;
	

}
