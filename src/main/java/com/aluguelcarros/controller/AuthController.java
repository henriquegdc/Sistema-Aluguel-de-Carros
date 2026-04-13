package com.aluguelcarros.controller;

import com.aluguelcarros.dto.ClienteDTO;
import com.aluguelcarros.model.Agente;
import com.aluguelcarros.model.Cliente;
import com.aluguelcarros.repository.AgenteRepository;
import com.aluguelcarros.service.ClienteService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Controller("/api/auth")
public class AuthController {

    private final ClienteService clienteService;
    private final AgenteRepository agenteRepository;

    public AuthController(ClienteService clienteService,
                          AgenteRepository agenteRepository) {
        this.clienteService = clienteService;
        this.agenteRepository = agenteRepository;
    }

    @Post("/login/agente")
    public HttpResponse<Map<String, Object>> loginAgente(@Body Map<String, String> body) {
        String codigo = body.get("codigo");
        Agente agente = agenteRepository.findByCodigo(codigo)
                .orElseThrow(() -> new IllegalArgumentException("Codigo de agente invalido"));

        return HttpResponse.ok(Map.of(
                "id", agente.getId(),
                "nome", agente.getNome(),
                "codigo", agente.getCodigo(),
                "perfil", "AGENTE"
        ));
    }

    @Post("/login/cliente")
    public HttpResponse<Map<String, Object>> loginCliente(@Body Map<String, String> body) {
        Cliente cliente = clienteService.autenticarCliente(body.get("cpf"), body.get("senha"));

        return HttpResponse.ok(Map.of(
                "id", cliente.getId(),
                "nome", cliente.getNome(),
                "cpf", cliente.getCpf(),
                "perfil", "CLIENTE"
        ));
    }

    @Post("/cadastro/cliente")
    public HttpResponse<ClienteDTO> cadastrarCliente(@Body Map<String, Object> body) {
        ClienteDTO dto = new ClienteDTO();
        dto.setNome((String) body.get("nome"));
        dto.setCpf((String) body.get("cpf"));
        dto.setRg((String) body.get("rg"));
        dto.setEndereco((String) body.get("endereco"));
        dto.setProfissao((String) body.get("profissao"));
        dto.setSenha((String) body.get("senha"));

        Object rendimentosBody = body.get("rendimentos");
        if (rendimentosBody instanceof List<?> rendimentosList) {
            dto.setRendimentos(rendimentosList.stream()
                    .map(value -> new BigDecimal(value.toString()))
                    .toList());
        }

        return HttpResponse.created(clienteService.criar(dto));
    }
}
