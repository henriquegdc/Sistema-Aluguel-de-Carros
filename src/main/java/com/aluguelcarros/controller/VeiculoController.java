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
    public HttpResponse<Map<String, Object>> salvar(@Body Veiculo veiculo) {
        Veiculo salvo = veiculoService.salvar(veiculo);
        return HttpResponse.created(toPayload(salvo));
    }

    @Put("/{id}")
    public HttpResponse<Map<String, Object>> atualizar(@PathVariable Long id, @Body Veiculo body) {
        Veiculo existente = veiculoService.obterPorId(id);
        existente.setMatricula(body.getMatricula());
        existente.setMarca(body.getMarca());
        existente.setModelo(body.getModelo());
        existente.setPlaca(body.getPlaca());
        existente.setAno(body.getAno());
        existente.setDisponivel(body.getDisponivel());

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
}
