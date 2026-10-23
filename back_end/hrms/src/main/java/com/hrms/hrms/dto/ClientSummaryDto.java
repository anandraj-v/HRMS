package com.hrms.hrms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientSummaryDto {
	private Integer clientId;
    private String clientName;
    private String industry;
}
