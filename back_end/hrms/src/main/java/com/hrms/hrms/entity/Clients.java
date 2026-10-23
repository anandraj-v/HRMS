package com.hrms.hrms.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Clients {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "client_id")
	private Integer clientId;
	
	@Column(name = "client_name")
	private String clientName;
	
	@Column(name = "industry")
	private String industry;
	
	@Column(name = "contact_email")
	private String contactEmail;
	
	@Column(name = "status")
	private String status;
	
	@OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Employees> employees;
	
}
