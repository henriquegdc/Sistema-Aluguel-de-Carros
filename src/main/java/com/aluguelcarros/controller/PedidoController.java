package com.aluguelcarros.controller;

import com.aluguelcarros.dto.PedidoDTO;
import com.aluguelcarros.enums.ResultadoAvaliacao;
import com.aluguelcarros.service.PedidoService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.http.annotation.Put;

import java.util.List;

@Controller("/api/pedidos")
public class PedidoController {

	private final PedidoService pedidoService;

	public PedidoController(PedidoService pedidoService) {
		this.pedidoService = pedidoService;
	}

	@Get("/cliente/{clienteId}")
	public HttpResponse<List<PedidoDTO>> listarPorCliente(@PathVariable Long clienteId) {
		return HttpResponse.ok(pedidoService.listarPorCliente(clienteId));
	}

	@Get("/pendentes")
	public HttpResponse<List<PedidoDTO>> listarPendentes() {
		return HttpResponse.ok(pedidoService.listarPendentes());
	}

	@Post
	public HttpResponse<PedidoDTO> criar(@Body PedidoDTO dto) {
		return HttpResponse.created(pedidoService.criar(dto));
	}

	@Put("/{pedidoId}")
	public HttpResponse<PedidoDTO> atualizar(@PathVariable Long pedidoId, @Body PedidoDTO dto) {
		return HttpResponse.ok(pedidoService.atualizar(pedidoId, dto));
	}

	@Post("/{pedidoId}/cancelar/{clienteId}")
	public HttpResponse<?> cancelar(@PathVariable Long pedidoId, @PathVariable Long clienteId) {
		pedidoService.cancelar(pedidoId, clienteId);
		return HttpResponse.ok();
	}

	@Post("/{pedidoId}/avaliar/{agenteId}/{resultado}")
	public HttpResponse<PedidoDTO> avaliar(@PathVariable Long pedidoId,
										   @PathVariable Long agenteId,
										   @PathVariable ResultadoAvaliacao resultado,
										   @QueryValue(defaultValue = "") String comentario) {
		return HttpResponse.ok(pedidoService.avaliar(pedidoId, agenteId, resultado, comentario));
	}
}
