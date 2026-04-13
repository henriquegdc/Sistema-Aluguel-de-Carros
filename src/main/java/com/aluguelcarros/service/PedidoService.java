package com.aluguelcarros.service;

import com.aluguelcarros.dto.PedidoDTO;
import com.aluguelcarros.enums.ResultadoAvaliacao;
import com.aluguelcarros.enums.StatusPedido;
import com.aluguelcarros.exception.RecursoNaoEncontradoException;
import com.aluguelcarros.model.Agente;
import com.aluguelcarros.model.Avaliacao;
import com.aluguelcarros.model.Cliente;
import com.aluguelcarros.model.Pedido;
import com.aluguelcarros.model.Veiculo;
import com.aluguelcarros.repository.AgenteRepository;
import com.aluguelcarros.repository.AvaliacaoRepository;
import com.aluguelcarros.repository.ClienteRepository;
import com.aluguelcarros.repository.PedidoRepository;
import com.aluguelcarros.repository.VeiculoRepository;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class PedidoService {

	private final PedidoRepository pedidoRepository;
	private final ClienteRepository clienteRepository;
	private final VeiculoRepository veiculoRepository;
	private final AvaliacaoRepository avaliacaoRepository;
	private final AgenteRepository agenteRepository;

	public PedidoService(PedidoRepository pedidoRepository,
						ClienteRepository clienteRepository,
						VeiculoRepository veiculoRepository,
						AvaliacaoRepository avaliacaoRepository,
						AgenteRepository agenteRepository) {
		this.pedidoRepository = pedidoRepository;
		this.clienteRepository = clienteRepository;
		this.veiculoRepository = veiculoRepository;
		this.avaliacaoRepository = avaliacaoRepository;
		this.agenteRepository = agenteRepository;
	}

	public PedidoDTO obterPorId(Long id) {
		Pedido pedido = pedidoRepository.findById(id)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Pedido com ID " + id + " nao encontrado"));
		return toDTO(pedido);
	}

	public List<PedidoDTO> listarPorCliente(Long clienteId) {
		return pedidoRepository.findByClienteIdOrderByDataPedidoDesc(clienteId)
				.stream()
				.map(this::toDTO)
				.collect(Collectors.toList());
	}

	public List<PedidoDTO> listarPendentes() {
		return pedidoRepository.findByStatusOrderByDataPedidoAsc(StatusPedido.PENDENTE)
				.stream()
				.map(this::toDTO)
				.collect(Collectors.toList());
	}

	@Transactional
	public PedidoDTO criar(PedidoDTO dto) {
		Cliente cliente = clienteRepository.findById(dto.getClienteId())
				.orElseThrow(() -> new RecursoNaoEncontradoException("Cliente nao encontrado"));
		Veiculo veiculo = veiculoRepository.findById(dto.getVeiculoId())
				.orElseThrow(() -> new RecursoNaoEncontradoException("Veiculo nao encontrado"));

		if (!Boolean.TRUE.equals(veiculo.getDisponivel())) {
			throw new IllegalArgumentException("Veiculo indisponivel para novo pedido");
		}

		Pedido pedido = new Pedido();
		pedido.setCliente(cliente);
		pedido.setVeiculo(veiculo);
		pedido.setObservacao(dto.getObservacao());
		pedido.setStatus(StatusPedido.PENDENTE);

		return toDTO(pedidoRepository.save(pedido));
	}

	@Transactional
	public PedidoDTO atualizar(Long pedidoId, PedidoDTO dto) {
		Pedido pedido = pedidoRepository.findById(pedidoId)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Pedido nao encontrado"));

		if (pedido.getStatus() != StatusPedido.PENDENTE) {
			throw new IllegalArgumentException("Somente pedidos pendentes podem ser alterados");
		}

		if (dto.getVeiculoId() != null && !dto.getVeiculoId().equals(pedido.getVeiculo().getId())) {
			Veiculo novoVeiculo = veiculoRepository.findById(dto.getVeiculoId())
					.orElseThrow(() -> new RecursoNaoEncontradoException("Veiculo nao encontrado"));
			if (!Boolean.TRUE.equals(novoVeiculo.getDisponivel())) {
				throw new IllegalArgumentException("Novo veiculo informado esta indisponivel");
			}
			pedido.setVeiculo(novoVeiculo);
		}

		pedido.setObservacao(dto.getObservacao());
		return toDTO(pedidoRepository.update(pedido));
	}

	@Transactional
	public void cancelar(Long pedidoId, Long clienteId) {
		Pedido pedido = pedidoRepository.findById(pedidoId)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Pedido nao encontrado"));

		if (!pedido.getCliente().getId().equals(clienteId)) {
			throw new IllegalArgumentException("Pedido nao pertence ao cliente informado");
		}

		if (pedido.getStatus() != StatusPedido.NAO_APROVADO) {
			throw new IllegalArgumentException("Pedido so pode ser cancelado quando nao aprovado");
		}

		pedido.setStatus(StatusPedido.CANCELADO);
		pedidoRepository.update(pedido);
	}

	@Transactional
	public PedidoDTO avaliar(Long pedidoId, Long agenteId, ResultadoAvaliacao resultado, String comentario) {
		Pedido pedido = pedidoRepository.findById(pedidoId)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Pedido nao encontrado"));
		Agente agente = agenteRepository.findById(agenteId)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Agente nao encontrado"));

		if (pedido.getStatus() != StatusPedido.PENDENTE) {
			throw new IllegalArgumentException("Somente pedidos pendentes podem ser avaliados");
		}

		Avaliacao avaliacao = avaliacaoRepository.findByPedidoId(pedidoId).orElseGet(Avaliacao::new);
		avaliacao.setPedido(pedido);
		avaliacao.setAgente(agente);
		avaliacao.setResultado(resultado);
		avaliacao.setComentario(comentario);

		if (resultado == ResultadoAvaliacao.APROVADO) {
			pedido.setStatus(StatusPedido.APROVADO);
		} else if (resultado == ResultadoAvaliacao.REJEITADO) {
			pedido.setStatus(StatusPedido.NAO_APROVADO);
		}

		pedidoRepository.update(pedido);
		avaliacaoRepository.save(avaliacao);
		return toDTO(pedido);
	}

	public Pedido obterEntidade(Long pedidoId) {
		return pedidoRepository.findById(pedidoId)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Pedido nao encontrado"));
	}

	private PedidoDTO toDTO(Pedido pedido) {
		PedidoDTO dto = new PedidoDTO();
		dto.setId(pedido.getId());
		dto.setClienteId(pedido.getCliente() != null ? pedido.getCliente().getId() : null);
		dto.setVeiculoId(pedido.getVeiculo() != null ? pedido.getVeiculo().getId() : null);
		dto.setStatus(pedido.getStatus());
		dto.setObservacao(pedido.getObservacao());
		dto.setDataPedido(pedido.getDataPedido());
		return dto;
	}
}
