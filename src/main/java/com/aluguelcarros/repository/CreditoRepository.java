package com.aluguelcarros.repository;

import com.aluguelcarros.model.Credito;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface CreditoRepository extends JpaRepository<Credito, Long> {
    Optional<Credito> findFirstByConcedidoTrueOrderByIdAsc();
}
