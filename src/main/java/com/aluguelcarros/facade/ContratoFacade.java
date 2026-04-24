package com.aluguelcarros.facade;

import com.aluguelcarros.dto.ContratoDTO;
import com.aluguelcarros.enums.TipoContrato;
import com.aluguelcarros.service.ContratoService;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

@Singleton
public class ContratoFacade {

	private final ContratoService contratoService;

	@Inject
	public ContratoFacade(ContratoService contratoService) {
		this.contratoService = contratoService;
	}

	public ContratoDTO gerarParaPedidoAprovado(Long pedidoId, TipoContrato tipoContrato) {
		return contratoService.gerarParaPedidoAprovado(pedidoId, tipoContrato);
	}

	public ContratoDTO obterPorId(Long id) {
		return contratoService.obterPorId(id);
	}

	public ContratoDTO obterPorPedido(Long pedidoId) {
		return contratoService.obterPorPedido(pedidoId);
	}

	public List<ContratoDTO> listarPorCliente(Long clienteId) {
		return contratoService.listarPorCliente(clienteId);
	}
}
