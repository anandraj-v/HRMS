package com.hrms.hrms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hrms.hrms.dto.ClientRequestDto;
import com.hrms.hrms.dto.ClientResponseDto;
import com.hrms.hrms.service.ClientService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/clients")

public class ClientsController {

	private final ClientService clientService;

    public ClientsController(ClientService clientService) {
        this.clientService = clientService;
    }
    
    @PostMapping
    public ResponseEntity<ClientResponseDto> createClient(@Validated @RequestBody ClientRequestDto requestDto) {
        ClientResponseDto createdClient = clientService.createClient(requestDto);
        return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ClientResponseDto>> getAllClients() {
        List<ClientResponseDto> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponseDto> getClientById(@PathVariable Integer id) {
        ClientResponseDto client = clientService.getClientById(id);
        return ResponseEntity.ok(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientResponseDto> updateClient(
            @PathVariable Integer id, 
            @Validated @RequestBody ClientRequestDto requestDto) {
        ClientResponseDto updatedClient = clientService.updateClient(id, requestDto);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
