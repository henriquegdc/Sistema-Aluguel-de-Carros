package com.aluguelcarros.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "creditos")
public class Credito {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "banco_id", nullable = false)
	private Banco banco;

	@Column(nullable = false)
	private BigDecimal limite;

	@Column(nullable = false)
	private Boolean concedido;

	@Column(name = "data_analise")
	private LocalDateTime dataAnalise;

	@OneToMany(mappedBy = "credito")
	private List<Contrato> contratos = new ArrayList<>();

	@PrePersist
	void onCreate() {
		if (concedido == null) {
			concedido = Boolean.FALSE;
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Banco getBanco() {
		return banco;
	}

	public void setBanco(Banco banco) {
		this.banco = banco;
	}

	public BigDecimal getLimite() {
		return limite;
	}

	public void setLimite(BigDecimal limite) {
		this.limite = limite;
	}

	public Boolean getConcedido() {
		return concedido;
	}

	public void setConcedido(Boolean concedido) {
		this.concedido = concedido;
	}

	public LocalDateTime getDataAnalise() {
		return dataAnalise;
	}

	public void setDataAnalise(LocalDateTime dataAnalise) {
		this.dataAnalise = dataAnalise;
	}

	public List<Contrato> getContratos() {
		return contratos;
	}

	public void setContratos(List<Contrato> contratos) {
		this.contratos = contratos;
	}
}
