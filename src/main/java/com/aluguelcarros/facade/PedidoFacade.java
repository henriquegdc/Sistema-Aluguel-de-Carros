package com.aluguelcarros.facade;

import com.aluguelcarros.dto.PedidoDTO;
import com.aluguelcarros.enums.ResultadoAvaliacao;
import com.aluguelcarros.service.PedidoService;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

@Singleton
public class PedidoFacade {

	private final PedidoService pedidoService;

	@Inject
	public PedidoFacade(PedidoService pedidoService) {
		this.pedidoService = pedidoService;
	}

	public PedidoDTO criar(PedidoDTO dto) {
		return pedidoService.criar(dto);
	}

	public PedidoDTO atualizar(Long pedidoId, PedidoDTO dto) {
		return pedidoService.atualizar(pedidoId, dto);
	}

	public List<PedidoDTO> listarPorCliente(Long clienteId) {
		return pedidoService.listarPorCliente(clienteId);
	}

	public List<PedidoDTO> listarPendentes() {
		return pedidoService.listarPendentes();
	}

	public void cancelar(Long pedidoId, Long clienteId) {
		pedidoService.cancelar(pedidoId, clienteId);
	}

	public PedidoDTO avaliar(Long pedidoId, Long agenteId, ResultadoAvaliacao resultado, String comentario) {
		return pedidoService.avaliar(pedidoId, agenteId, resultado, comentario);
	}
}
