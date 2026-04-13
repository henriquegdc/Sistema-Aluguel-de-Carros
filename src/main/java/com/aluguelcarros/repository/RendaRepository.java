package com.aluguelcarros.repository;

import com.aluguelcarros.model.Renda;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface RendaRepository extends JpaRepository<Renda, Long> {
    List<Renda> findByClienteId(Long clienteId);
}
