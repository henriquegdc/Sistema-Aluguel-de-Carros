package com.aluguelcarros.controller;

import com.aluguelcarros.model.Agente;
import com.aluguelcarros.repository.AgenteRepository;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.QueryValue;

import java.util.List;
import java.util.Map;

@Controller("/api/agentes")
public class AgenteController {

    private final AgenteRepository agenteRepository;

    public AgenteController(AgenteRepository agenteRepository) {
        this.agenteRepository = agenteRepository;
    }

    @Get
    public HttpResponse<List<Map<String, Object>>> listar(@QueryValue(defaultValue = "") String codigo) {
        if (codigo != null && !codigo.isBlank()) {
            Agente agente = agenteRepository.findByCodigo(codigo)
                    .orElseThrow(() -> new IllegalArgumentException("Agente nao encontrado para codigo informado"));
            return HttpResponse.ok(List.of(toPayload(agente)));
        }
        return HttpResponse.ok(agenteRepository.findAll().stream().map(this::toPayload).toList());
    }

    @Get("/{id}")
    public HttpResponse<Map<String, Object>> obterPorId(@PathVariable Long id) {
        Agente agente = agenteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Agente nao encontrado"));
        return HttpResponse.ok(toPayload(agente));
    }

    private Map<String, Object> toPayload(Agente agente) {
        return Map.of(
                "id", agente.getId(),
                "nome", agente.getNome(),
                "cpf", agente.getCpf() == null ? "" : agente.getCpf(),
                "codigo", agente.getCodigo(),
                "ativo", agente.getAtivo()
        );
    }
}
