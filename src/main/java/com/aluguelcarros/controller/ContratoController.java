package com.aluguelcarros.controller;

import com.aluguelcarros.dto.ContratoDTO;
import com.aluguelcarros.enums.TipoContrato;
import com.aluguelcarros.service.ContratoService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;

import java.util.List;

@Controller("/api/contratos")
public class ContratoController {

	private final ContratoService contratoService;

	public ContratoController(ContratoService contratoService) {
		this.contratoService = contratoService;
	}

	@Post("/pedido/{pedidoId}/{tipoContrato}")
	public HttpResponse<ContratoDTO> gerar(@PathVariable Long pedidoId, @PathVariable TipoContrato tipoContrato) {
		return HttpResponse.created(contratoService.gerarParaPedidoAprovado(pedidoId, tipoContrato));
	}

	@Get("/{id}")
	public HttpResponse<ContratoDTO> obterPorId(@PathVariable Long id) {
		return HttpResponse.ok(contratoService.obterPorId(id));
	}

	@Get("/pedido/{pedidoId}")
	public HttpResponse<ContratoDTO> obterPorPedido(@PathVariable Long pedidoId) {
		return HttpResponse.ok(contratoService.obterPorPedido(pedidoId));
	}

	@Get("/cliente/{clienteId}")
	public HttpResponse<List<ContratoDTO>> listarPorCliente(@PathVariable Long clienteId) {
		return HttpResponse.ok(contratoService.listarPorCliente(clienteId));
	}
}
