package com.aluguelcarros.service;

import com.aluguelcarros.dto.ContratoDTO;
import com.aluguelcarros.enums.StatusPedido;
import com.aluguelcarros.enums.TipoContrato;
import com.aluguelcarros.exception.RecursoNaoEncontradoException;
import com.aluguelcarros.model.Contrato;
import com.aluguelcarros.model.Credito;
import com.aluguelcarros.model.Pedido;
import com.aluguelcarros.model.Veiculo;
import com.aluguelcarros.repository.ContratoRepository;
import com.aluguelcarros.repository.CreditoRepository;
import com.aluguelcarros.repository.PedidoRepository;
import com.aluguelcarros.repository.VeiculoRepository;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class ContratoService {

	private final ContratoRepository contratoRepository;
	private final PedidoRepository pedidoRepository;
	private final CreditoRepository creditoRepository;
	private final VeiculoRepository veiculoRepository;

	public ContratoService(ContratoRepository contratoRepository,
						   PedidoRepository pedidoRepository,
						   CreditoRepository creditoRepository,
						   VeiculoRepository veiculoRepository) {
		this.contratoRepository = contratoRepository;
		this.pedidoRepository = pedidoRepository;
		this.creditoRepository = creditoRepository;
		this.veiculoRepository = veiculoRepository;
	}

	@Transactional
	public ContratoDTO gerarParaPedidoAprovado(Long pedidoId, TipoContrato tipoContrato) {
		contratoRepository.findByPedidoId(pedidoId).ifPresent(contrato -> {
			throw new IllegalArgumentException("Pedido ja possui contrato gerado");
		});

		Pedido pedido = pedidoRepository.findById(pedidoId)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Pedido nao encontrado"));

		if (pedido.getStatus() != StatusPedido.APROVADO) {
			throw new IllegalArgumentException("Somente pedido aprovado pode gerar contrato");
		}

		Contrato contrato = new Contrato();
		contrato.setPedido(pedido);
		contrato.setCliente(pedido.getCliente());
		contrato.setVeiculo(pedido.getVeiculo());
		contrato.setTipoContrato(tipoContrato);

		Credito credito = creditoRepository.findFirstByConcedidoTrueOrderByIdAsc().orElse(null);
		contrato.setCredito(credito);

		Contrato salvo = contratoRepository.save(contrato);

		Veiculo veiculo = pedido.getVeiculo();
		veiculo.setDisponivel(Boolean.FALSE);
		veiculoRepository.update(veiculo);

		return toDTO(salvo);
	}

	public ContratoDTO obterPorId(Long id) {
		Contrato contrato = contratoRepository.findById(id)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Contrato nao encontrado"));
		return toDTO(contrato);
	}

	public List<ContratoDTO> listarPorCliente(Long clienteId) {
		return contratoRepository.findByClienteIdOrderByDataGeracaoDesc(clienteId)
				.stream()
				.map(this::toDTO)
				.collect(Collectors.toList());
	}

	public ContratoDTO obterPorPedido(Long pedidoId) {
		Contrato contrato = contratoRepository.findByPedidoId(pedidoId)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Contrato nao encontrado para o pedido"));
		return toDTO(contrato);
	}

	private ContratoDTO toDTO(Contrato contrato) {
		ContratoDTO dto = new ContratoDTO();
		dto.setId(contrato.getId());
		dto.setPedidoId(contrato.getPedido() != null ? contrato.getPedido().getId() : null);
		dto.setClienteId(contrato.getCliente() != null ? contrato.getCliente().getId() : null);
		dto.setVeiculoId(contrato.getVeiculo() != null ? contrato.getVeiculo().getId() : null);
		dto.setCreditoId(contrato.getCredito() != null ? contrato.getCredito().getId() : null);
		dto.setTipoContrato(contrato.getTipoContrato());
		dto.setDataGeracao(contrato.getDataGeracao());
		dto.setAtivo(contrato.getAtivo());
		return dto;
	}
}
