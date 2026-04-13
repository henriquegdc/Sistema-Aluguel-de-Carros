package com.aluguelcarros.model;

import com.aluguelcarros.enums.ResultadoAvaliacao;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "avaliacoes")
public class Avaliacao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "pedido_id", nullable = false, unique = true)
	private Pedido pedido;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "agente_id")
	private Agente agente;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ResultadoAvaliacao resultado;

	@Column(length = 255)
	private String comentario;

	@Column(name = "data_avaliacao", nullable = false)
	private LocalDateTime dataAvaliacao;

	@PrePersist
	void onCreate() {
		if (resultado == null) {
			resultado = ResultadoAvaliacao.PENDENTE;
		}
		if (dataAvaliacao == null) {
			dataAvaliacao = LocalDateTime.now();
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public Agente getAgente() {
		return agente;
	}

	public void setAgente(Agente agente) {
		this.agente = agente;
	}

	public ResultadoAvaliacao getResultado() {
		return resultado;
	}

	public void setResultado(ResultadoAvaliacao resultado) {
		this.resultado = resultado;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public LocalDateTime getDataAvaliacao() {
		return dataAvaliacao;
	}

	public void setDataAvaliacao(LocalDateTime dataAvaliacao) {
		this.dataAvaliacao = dataAvaliacao;
	}
}
