package com.hrms.hrms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hrms.hrms.dto.ClientRequestDto;
import com.hrms.hrms.dto.ClientResponseDto;
import com.hrms.hrms.entity.Clients;
import com.hrms.hrms.repository.ClientsRepository;

import jakarta.persistence.EntityNotFoundException;



@Service
public class ClientService {

	private final ClientsRepository clientRepository;

	public ClientService(ClientsRepository clientRepository) {
		this.clientRepository = clientRepository;
	}

	@Transactional
	public ClientResponseDto createClient(ClientRequestDto requestDto) {
		Clients clients = Clients.builder().clientName(requestDto.getClientName()).industry(requestDto.getIndustry())
				.contactEmail(requestDto.getContactEmail())
				.status(requestDto.getStatus() != null ? requestDto.getStatus() : "Active").build();

		Clients savedClient = clientRepository.save(clients);
		return mapToDto(savedClient);
	}
	
	@Transactional(readOnly = true)
    public List<ClientResponseDto> getAllClients() {
        return clientRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
	@Transactional(readOnly = true)
    public ClientResponseDto getClientById(Integer id) {
        Clients client = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with ID: " + id));
        return mapToDto(client);
    }
	
	@Transactional
    public ClientResponseDto updateClient(Integer id, ClientRequestDto requestDto) {
        Clients client = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with ID: " + id));

        client.setClientName(requestDto.getClientName());
        client.setIndustry(requestDto.getIndustry());
        client.setContactEmail(requestDto.getContactEmail());
        if (requestDto.getStatus() != null) {
            client.setStatus(requestDto.getStatus());
        }

        Clients updatedClient = clientRepository.save(client);
        return mapToDto(updatedClient);
    }
	@Transactional
    public void deleteClient(Integer id) {
        if (!clientRepository.existsById(id)) {
            throw new EntityNotFoundException("Client not found with ID: " + id);
        }
        clientRepository.deleteById(id);
    }
	private ClientResponseDto mapToDto(Clients client) {
		return ClientResponseDto.builder().clientId(client.getClientId()).clientName(client.getClientName())
				.industry(client.getIndustry()).contactEmail(client.getContactEmail()).status(client.getStatus())
				.build();
	}
}
