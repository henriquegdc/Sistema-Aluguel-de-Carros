package com.aluguelcarros.controller;

import com.aluguelcarros.dto.ClienteDTO;
import com.aluguelcarros.service.ClienteService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import jakarta.inject.Inject;
import jakarta.validation.Valid;

import java.util.List;

/**
 * Controller REST para Cliente
 * Responsável pelos endpoints de CRUD de clientes
 * 
 * Endpoints:
 * - GET  /clientes           - Listar todos os clientes
 * - GET  /clientes/{id}      - Obter um cliente por ID
 * - POST /clientes           - Criar novo cliente
 * - PUT  /clientes/{id}      - Atualizar cliente
 * - DELETE /clientes/{id}    - Deletar cliente
 */
@Controller("/clientes")
public class ClienteController {

    @Inject
    private ClienteService clienteService;

    /**
     * GET /clientes
     * Lista todos os clientes cadastrados
     */
    @Get
    public HttpResponse<List<ClienteDTO>> listarTodos() {
        List<ClienteDTO> clientes = clienteService.listarTodos();
        return HttpResponse.ok(clientes);
    }

    /**
     * GET /clientes/{id}
     * Obtém um cliente específico por ID
     */
    @Get("/{id}")
    public HttpResponse<ClienteDTO> obterPorId(@PathVariable Long id) {
        ClienteDTO cliente = clienteService.obterPorId(id);
        return HttpResponse.ok(cliente);
    }

    /**
     * POST /clientes
     * Cria um novo cliente
     */
    @Post
    public HttpResponse<ClienteDTO> criar(@Body @Valid ClienteDTO clienteDTO) {
        ClienteDTO clienteCriado = clienteService.criar(clienteDTO);
        return HttpResponse.created(clienteCriado);
    }

    /**
     * PUT /clientes/{id}
     * Atualiza um cliente existente
     */
    @Put("/{id}")
    public HttpResponse<ClienteDTO> atualizar(
            @PathVariable Long id,
            @Body @Valid ClienteDTO clienteDTO) {
        ClienteDTO clienteAtualizado = clienteService.atualizar(id, clienteDTO);
        return HttpResponse.ok(clienteAtualizado);
    }

    /**
     * DELETE /clientes/{id}
     * Deleta um cliente
     */
    @Delete("/{id}")
    public HttpResponse<?> deletar(@PathVariable Long id) {
        clienteService.deletar(id);
        return HttpResponse.noContent();
    }
}
