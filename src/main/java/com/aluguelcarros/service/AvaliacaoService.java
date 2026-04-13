package com.aluguelcarros.service;

import com.aluguelcarros.dto.AvaliacaoDTO;
import com.aluguelcarros.exception.RecursoNaoEncontradoException;
import com.aluguelcarros.model.Avaliacao;
import com.aluguelcarros.repository.AvaliacaoRepository;
import jakarta.inject.Singleton;

import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class AvaliacaoService {

	private final AvaliacaoRepository avaliacaoRepository;

	public AvaliacaoService(AvaliacaoRepository avaliacaoRepository) {
		this.avaliacaoRepository = avaliacaoRepository;
	}

	public AvaliacaoDTO obterPorPedido(Long pedidoId) {
		Avaliacao avaliacao = avaliacaoRepository.findByPedidoId(pedidoId)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Avaliacao do pedido nao encontrada"));
		return toDTO(avaliacao);
	}

	public List<AvaliacaoDTO> listarTodas() {
		return avaliacaoRepository.findAll().stream()
				.map(this::toDTO)
				.collect(Collectors.toList());
	}

	private AvaliacaoDTO toDTO(Avaliacao avaliacao) {
		AvaliacaoDTO dto = new AvaliacaoDTO();
		dto.setId(avaliacao.getId());
		dto.setPedidoId(avaliacao.getPedido() != null ? avaliacao.getPedido().getId() : null);
		dto.setAgenteId(avaliacao.getAgente() != null ? avaliacao.getAgente().getId() : null);
		dto.setResultado(avaliacao.getResultado());
		dto.setComentario(avaliacao.getComentario());
		dto.setDataAvaliacao(avaliacao.getDataAvaliacao());
		return dto;
	}
}
