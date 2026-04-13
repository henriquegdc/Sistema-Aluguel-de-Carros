package com.aluguelcarros.dto;

import com.aluguelcarros.enums.ResultadoAvaliacao;
import io.micronaut.serde.annotation.Serdeable;

import java.time.LocalDateTime;

@Serdeable
public class AvaliacaoDTO {
	private Long id;
	private Long pedidoId;
	private Long agenteId;
	private ResultadoAvaliacao resultado;
	private String comentario;
	private LocalDateTime dataAvaliacao;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPedidoId() {
		return pedidoId;
	}

	public void setPedidoId(Long pedidoId) {
		this.pedidoId = pedidoId;
	}

	public Long getAgenteId() {
		return agenteId;
	}

	public void setAgenteId(Long agenteId) {
		this.agenteId = agenteId;
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
