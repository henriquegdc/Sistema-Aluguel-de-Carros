package com.aluguelcarros.repository;

import com.aluguelcarros.model.Veiculo;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
	Optional<Veiculo> findByPlaca(String placa);

	Optional<Veiculo> findByMatricula(String matricula);

	List<Veiculo> findByDisponivelTrue();
}
