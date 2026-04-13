package com.aluguelcarros.service;

import com.aluguelcarros.dto.ClienteDTO;
import com.aluguelcarros.exception.RecursoNaoEncontradoException;
import com.aluguelcarros.model.Cliente;
import com.aluguelcarros.model.Renda;
import com.aluguelcarros.repository.ClienteRepository;
import com.aluguelcarros.repository.RendaRepository;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Serviço de negócio para Cliente
 * Responsável pela lógica de CRUD e validações
*/
@Singleton
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final RendaRepository rendaRepository;

    public ClienteService(ClienteRepository clienteRepository, RendaRepository rendaRepository) {
        this.clienteRepository = clienteRepository;
        this.rendaRepository = rendaRepository;
    }
    
    /**
     * Obtém todos os clientes
     */
    public List<ClienteDTO> listarTodos() {
        return clienteRepository.findAll().stream()
            .sorted(Comparator.comparing(Cliente::getNome))
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
        validarCpf(clienteDTO.getCpf());
        validarRendimentos(clienteDTO.getRendimentos());
        validarDuplicidade(clienteDTO.getCpf(), clienteDTO.getRg(), null);

        Cliente cliente = toEntity(clienteDTO);
        Cliente clienteCriado = clienteRepository.save(cliente);
        salvarRendas(clienteCriado, clienteDTO.getRendimentos());
        return toDTO(clienteCriado);
    }

    /**
     * Atualiza um cliente existente
     */
    @Transactional
    public ClienteDTO atualizar(Long id, ClienteDTO clienteDTO) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente com ID " + id + " nao encontrado"));

        validarCpf(clienteDTO.getCpf());
        validarRendimentos(clienteDTO.getRendimentos());
        validarDuplicidade(clienteDTO.getCpf(), clienteDTO.getRg(), id);

        cliente.setCpf(clienteDTO.getCpf());
        cliente.setRg(clienteDTO.getRg());
        cliente.setNome(clienteDTO.getNome());
        cliente.setEndereco(clienteDTO.getEndereco());
        cliente.setProfissao(clienteDTO.getProfissao());
        if (clienteDTO.getSenha() != null && !clienteDTO.getSenha().isBlank()) {
            cliente.setSenha(clienteDTO.getSenha());
        }

        Cliente atualizado = clienteRepository.update(cliente);
        rendaRepository.deleteAll(rendaRepository.findByClienteId(id));
        salvarRendas(atualizado, clienteDTO.getRendimentos());

        return toDTO(atualizado);
    }

    public Cliente autenticarCliente(String cpf, String senha) {
        Cliente cliente = clienteRepository.findByCpf(cpf)
                .orElseThrow(() -> new IllegalArgumentException("CPF nao encontrado"));

        if (!cliente.getSenha().equals(senha)) {
            throw new IllegalArgumentException("Senha invalida");
        }

        return cliente;
    }

    /**
     * Deleta um cliente
     */
    public void deletar(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente com ID " + id + " nao encontrado"));
        clienteRepository.delete(cliente);
    }

    public Cliente obterEntidadePorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente com ID " + id + " nao encontrado"));
    }

    private void validarCpf(String cpf) {
        if (cpf == null || !cpf.matches("\\d{11}")) {
            throw new IllegalArgumentException("CPF deve conter 11 digitos numericos");
        }
    }

    private void validarRendimentos(List<BigDecimal> rendimentos) {
        if (rendimentos == null) {
            return;
        }
        if (rendimentos.size() > 3) {
            throw new IllegalArgumentException("Cliente pode ter no maximo 3 rendimentos");
        }
        boolean possuiInvalido = rendimentos.stream()
                .anyMatch(valor -> valor == null || valor.compareTo(BigDecimal.ZERO) <= 0);
        if (possuiInvalido) {
            throw new IllegalArgumentException("Todos os rendimentos devem ser positivos");
        }
    }

    private void validarDuplicidade(String cpf, String rg, Long idAtual) {
        clienteRepository.findByCpf(cpf).ifPresent(cliente -> {
            if (idAtual == null || !cliente.getId().equals(idAtual)) {
                throw new IllegalArgumentException("Cliente com CPF " + cpf + " ja cadastrado");
            }
        });

        clienteRepository.findByRg(rg).ifPresent(cliente -> {
            if (idAtual == null || !cliente.getId().equals(idAtual)) {
                throw new IllegalArgumentException("Cliente com RG " + rg + " ja cadastrado");
            }
        });
    }

    private void salvarRendas(Cliente cliente, List<BigDecimal> rendimentos) {
        if (rendimentos == null || rendimentos.isEmpty()) {
            return;
        }

        int index = 1;
        for (BigDecimal rendimento : rendimentos) {
            Renda renda = new Renda();
            renda.setCliente(cliente);
            renda.setFonte("Renda " + index++);
            renda.setValor(rendimento);
            rendaRepository.save(renda);
        }
    }

    /**
     * Converte Cliente para ClienteDTO
     */
    private ClienteDTO toDTO(Cliente cliente) {
        ClienteDTO dto = new ClienteDTO(
                cliente.getId(),
                cliente.getRg(),
                cliente.getCpf(),
                cliente.getNome(),
                cliente.getEndereco(),
                cliente.getProfissao(),
                cliente.getSenha()
        );

        List<BigDecimal> rendimentos = new ArrayList<>();
        for (Renda renda : rendaRepository.findByClienteId(cliente.getId())) {
            rendimentos.add(renda.getValor());
        }
        dto.setRendimentos(rendimentos);
        return dto;
    }

    /**
     * Converte ClienteDTO para Cliente
     */
    private Cliente toEntity(ClienteDTO dto) {
        String senha = dto.getSenha() == null || dto.getSenha().isBlank() ? "123456" : dto.getSenha();
        return new Cliente(dto.getId(), dto.getRg(), dto.getCpf(), dto.getNome(), dto.getEndereco(), dto.getProfissao(), senha);
    }
}
