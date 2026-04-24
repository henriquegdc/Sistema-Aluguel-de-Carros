package com.aluguelcarros.controller;

import com.aluguelcarros.model.Veiculo;
import com.aluguelcarros.service.VeiculoService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;

import java.util.List;
import java.util.Map;

@Controller("/api/veiculos")
public class VeiculoController {

    private final VeiculoService veiculoService;

    public VeiculoController(VeiculoService veiculoService) {
        this.veiculoService = veiculoService;
    }

    @Get
    public HttpResponse<List<Map<String, Object>>> listar() {
        return HttpResponse.ok(veiculoService.listarTodos().stream().map(this::toPayload).toList());
    }

    @Get("/disponiveis")
    public HttpResponse<List<Map<String, Object>>> listarDisponiveis() {
        return HttpResponse.ok(veiculoService.listarDisponiveis().stream().map(this::toPayload).toList());
    }

    @Get("/{id}")
    public HttpResponse<Map<String, Object>> obterPorId(@PathVariable Long id) {
        return HttpResponse.ok(toPayload(veiculoService.obterPorId(id)));
    }

    @Post
    public HttpResponse<Map<String, Object>> salvar(@Body Map<String, Object> body) {
        Veiculo salvo = veiculoService.salvar(fromPayload(body));
        return HttpResponse.created(toPayload(salvo));
    }

    @Put("/{id}")
    public HttpResponse<Map<String, Object>> atualizar(@PathVariable Long id, @Body Map<String, Object> body) {
        Veiculo payload = fromPayload(body);
        Veiculo existente = veiculoService.obterPorId(id);
        existente.setMatricula(payload.getMatricula());
        existente.setMarca(payload.getMarca());
        existente.setModelo(payload.getModelo());
        existente.setPlaca(payload.getPlaca());
        existente.setAno(payload.getAno());
        existente.setDisponivel(payload.getDisponivel());

        Veiculo atualizado = veiculoService.salvar(existente);
        return HttpResponse.ok(toPayload(atualizado));
    }

    @Delete("/{id}")
    public HttpResponse<?> remover(@PathVariable Long id) {
        veiculoService.remover(id);
        return HttpResponse.noContent();
    }

    private Map<String, Object> toPayload(Veiculo veiculo) {
        return Map.of(
                "id", veiculo.getId(),
                "matricula", veiculo.getMatricula(),
                "marca", veiculo.getMarca(),
                "modelo", veiculo.getModelo(),
                "placa", veiculo.getPlaca(),
                "ano", veiculo.getAno(),
                "disponivel", veiculo.getDisponivel()
        );
    }

    private Veiculo fromPayload(Map<String, Object> body) {
        Veiculo veiculo = new Veiculo();
        veiculo.setMatricula((String) body.get("matricula"));
        veiculo.setMarca((String) body.get("marca"));
        veiculo.setModelo((String) body.get("modelo"));
        veiculo.setPlaca((String) body.get("placa"));

        Object ano = body.get("ano");
        if (ano != null) {
            veiculo.setAno(Integer.valueOf(ano.toString()));
        }

        Object disponivel = body.get("disponivel");
        if (disponivel != null) {
            veiculo.setDisponivel(Boolean.valueOf(disponivel.toString()));
        }

        return veiculo;
    }
}
