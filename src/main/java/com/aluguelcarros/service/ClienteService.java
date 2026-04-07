package com.aluguelcarros.service;

import com.aluguelcarros.dto.ClienteDTO;
import com.aluguelcarros.exception.RecursoNaoEncontradoException;
import com.aluguelcarros.model.Cliente;
import com.aluguelcarros.repository.ClienteRepository;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Serviço de negócio para Cliente
 * Responsável pela lógica de CRUD e validações
*/
@Singleton
public class ClienteService {
    
    @Inject
    private ClienteRepository clienteRepository;
    
    /**
     * Obtém todos os clientes
     */
    public List<ClienteDTO> listarTodos() {
        return clienteRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtém um cliente por ID
     */
    public ClienteDTO obterPorId(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente com ID " + id + " não encontrado"));
        return toDTO(cliente);
    }

    /**
     * Cria um novo cliente
     */
    public ClienteDTO criar(ClienteDTO clienteDTO) {
        // Validar se CPF já existe
        if (clienteRepository.findByCpf(clienteDTO.getCpf()).isPresent()) {
            throw new IllegalArgumentException("Cliente com CPF " + clienteDTO.getCpf() + " já cadastrado");
        }

        // Validar se RG já existe
        if (clienteRepository.findByRg(clienteDTO.getRg()).isPresent()) {
            throw new IllegalArgumentException("Cliente com RG " + clienteDTO.getRg() + " já cadastrado");
        }

        Cliente cliente = toEntity(clienteDTO);
        Cliente clienteCriado = clienteRepository.save(cliente);
        return toDTO(clienteCriado);
    }

    /**
     * Atualiza um cliente existente
     */
    public ClienteDTO atualizar(Long id, ClienteDTO clienteDTO) {
        Cliente clienteAtualizado = toEntity(clienteDTO);
        Cliente cliente = clienteRepository.update(id, clienteAtualizado)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente com ID " + id + " não encontrado"));
        return toDTO(cliente);
    }

    /**
     * Deleta um cliente
     */
    public void deletar(Long id) {
        if (!clienteRepository.deleteById(id)) {
            throw new RecursoNaoEncontradoException("Cliente com ID " + id + " não encontrado");
        }
    }

    /**
     * Converte Cliente para ClienteDTO
     */
    private ClienteDTO toDTO(Cliente cliente) {
        return new ClienteDTO(
                cliente.getId(),
                cliente.getRg(),
                cliente.getCpf(),
                cliente.getNome(),
                cliente.getEndereco(),
                cliente.getProfissao()
        );
    }

    /**
     * Converte ClienteDTO para Cliente
     */
    private Cliente toEntity(ClienteDTO dto) {
        return new Cliente(
                dto.getId(),
                dto.getRg(),
                dto.getCpf(),
                dto.getNome(),
                dto.getEndereco(),
                dto.getProfissao()
        );
    }
}
