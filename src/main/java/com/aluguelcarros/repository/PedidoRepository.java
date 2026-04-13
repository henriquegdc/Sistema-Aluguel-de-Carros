package com.aluguelcarros.repository;

import com.aluguelcarros.enums.StatusPedido;
import com.aluguelcarros.model.Pedido;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
	List<Pedido> findByClienteIdOrderByDataPedidoDesc(Long clienteId);

	List<Pedido> findByStatusOrderByDataPedidoAsc(StatusPedido status);
}
