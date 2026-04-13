package com.aluguelcarros.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Transfer Object para Cliente
 * Utilizado para transferência de dados entre camadas
 */
@Serdeable
public class ClienteDTO {

    private Long id;

    @NotBlank(message = "RG não pode ser vazio")
    private String rg;

    @NotBlank(message = "CPF não pode ser vazio")
    private String cpf;

    @NotBlank(message = "Nome não pode ser vazio")
    private String nome;

    @NotBlank(message = "Endereço não pode ser vazio")
    private String endereco;

    @NotBlank(message = "Profissão não pode ser vazia")
    private String profissao;

    private String senha;

    private List<BigDecimal> rendimentos = new ArrayList<>();

    public ClienteDTO() {
    }

    public ClienteDTO(Long id, String rg, String cpf, String nome, String endereco, String profissao, String senha) {
        this.id = id;
        this.rg = rg;
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.profissao = profissao;
        this.senha = senha;
    }

    public ClienteDTO(String rg, String cpf, String nome, String endereco, String profissao, String senha) {
        this.rg = rg;
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.profissao = profissao;
        this.senha = senha;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<BigDecimal> getRendimentos() {
        return rendimentos;
    }

    public void setRendimentos(List<BigDecimal> rendimentos) {
        this.rendimentos = rendimentos;
    }

    @Override
    public String toString() {
        return "ClienteDTO{" +
                "id=" + id +
                ", rg='" + rg + '\'' +
                ", cpf='" + cpf + '\'' +
                ", nome='" + nome + '\'' +
                ", endereco='" + endereco + '\'' +
                ", profissao='" + profissao + '\'' +
                ", rendimentos=" + rendimentos +
                '}';
    }
}
