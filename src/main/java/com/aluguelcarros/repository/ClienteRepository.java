package com.aluguelcarros.repository;

import com.aluguelcarros.model.Cliente;
import jakarta.inject.Singleton;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Repositório em memória para Cliente
 * Armazena clientes em um array list (implementação em memória)
 */
@Singleton
public class ClienteRepository {

    private final List<Cliente> clientes = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    /**
     * Encontra todos os clientes
     */
    public List<Cliente> findAll() {
        return new ArrayList<>(clientes);
    }

    /**
     * Encontra um cliente por ID
     */
    public Optional<Cliente> findById(Long id) {
        return clientes.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst();
    }

    /**
     * Encontra um cliente por CPF
     */
    public Optional<Cliente> findByCpf(String cpf) {
        return clientes.stream()
                .filter(c -> c.getCpf().equals(cpf))
                .findFirst();
    }

    /**
     * Encontra um cliente por RG
     */
    public Optional<Cliente> findByRg(String rg) {
        return clientes.stream()
                .filter(c -> c.getRg().equals(rg))
                .findFirst();
    }

    /**
     * Salva um novo cliente
     */
    public Cliente save(Cliente cliente) {
        if (cliente.getId() == null) {
            cliente.setId(idGenerator.getAndIncrement());
        }
        clientes.add(cliente);
        return cliente;
    }

    /**
     * Atualiza um cliente existente
     */
    public Optional<Cliente> update(Long id, Cliente clienteAtualizado) {
        return findById(id).map(cliente -> {
            cliente.setRg(clienteAtualizado.getRg());
            cliente.setCpf(clienteAtualizado.getCpf());
            cliente.setNome(clienteAtualizado.getNome());
            cliente.setEndereco(clienteAtualizado.getEndereco());
            cliente.setProfissao(clienteAtualizado.getProfissao());
            return cliente;
        });
    }

    /**
     * Deleta um cliente por ID
     */
    public boolean deleteById(Long id) {
        return clientes.removeIf(c -> c.getId().equals(id));
    }

    /**
     * Conta o total de clientes
     */
    public long count() {
        return clientes.size();
    }
}
