package com.aluguelcarros.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clientes", uniqueConstraints = {
        @UniqueConstraint(name = "uk_cliente_cpf", columnNames = "cpf"),
        @UniqueConstraint(name = "uk_cliente_rg", columnNames = "rg")
})
public class Cliente extends Usuario {

    private String rg;
    private String endereco;
    private String profissao;
    private String senha;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Renda> rendas = new ArrayList<>();

    @OneToMany(mappedBy = "cliente")
    private List<Pedido> pedidos = new ArrayList<>();

    public Cliente() {
    }

    public Cliente(Long id, String rg, String cpf, String nome, String endereco, String profissao, String senha) {
        setId(id);
        setCpf(cpf);
        setNome(nome);
        this.rg = rg;
        this.endereco = endereco;
        this.profissao = profissao;
        this.senha = senha;
    }

    public Cliente(String rg, String cpf, String nome, String endereco, String profissao, String senha) {
        setCpf(cpf);
        setNome(nome);
        this.rg = rg;
        this.endereco = endereco;
        this.profissao = profissao;
        this.senha = senha;
    }

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (senha == null || senha.isBlank()) {
            senha = "123456";
        }
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Renda> getRendas() {
        return rendas;
    }

    public void setRendas(List<Renda> rendas) {
        this.rendas = rendas;
    }

    public List<Pedido> getPedidos() {
        return pedidos;
    }

    public void setPedidos(List<Pedido> pedidos) {
        this.pedidos = pedidos;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + getId() +
                ", rg='" + rg + '\'' +
                ", cpf='" + getCpf() + '\'' +
                ", nome='" + getNome() + '\'' +
                ", endereco='" + endereco + '\'' +
                ", profissao='" + profissao + '\'' +
                '}';
    }
}
