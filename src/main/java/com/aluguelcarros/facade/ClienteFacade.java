package com.aluguelcarros.facade;

import com.aluguelcarros.dto.ClienteDTO;
import com.aluguelcarros.service.ClienteService;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

/**
 * Facade para Cliente
 * Simplifica a interface de acesso aos serviços de Cliente
 * Padrão de projeto que fornece uma interface unificada para operações de cliente
 */
@Singleton
public class ClienteFacade {

    @Inject
    private ClienteService clienteService;

    /**
     * Listar todos os clientes
     */
    public List<ClienteDTO> listarTodos() {
        return clienteService.listarTodos();
    }

    /**
     * Obter cliente por ID
     */
    public ClienteDTO obterPorId(Long id) {
        return clienteService.obterPorId(id);
    }

    /**
     * Criar novo cliente
     */
    public ClienteDTO criar(ClienteDTO clienteDTO) {
        return clienteService.criar(clienteDTO);
    }

    /**
     * Atualizar cliente
     */
    public ClienteDTO atualizar(Long id, ClienteDTO clienteDTO) {
        return clienteService.atualizar(id, clienteDTO);
    }

    /**
     * Deletar cliente
     */
    public void deletar(Long id) {
        clienteService.deletar(id);
    }
}
