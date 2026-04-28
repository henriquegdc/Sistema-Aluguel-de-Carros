package com.aluguelcarros.service;

import com.aluguelcarros.exception.RecursoNaoEncontradoException;
import com.aluguelcarros.model.Veiculo;
import com.aluguelcarros.repository.VeiculoRepository;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

import java.util.Comparator;
import java.util.List;

@Singleton
public class VeiculoService {

    private final VeiculoRepository veiculoRepository;

    public VeiculoService(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }

    public List<Veiculo> listarDisponiveis() {
        return veiculoRepository.findByDisponivelTrue().stream()
                .sorted(Comparator.comparing(Veiculo::getMarca).thenComparing(Veiculo::getModelo))
                .toList();
    }

    public Veiculo obterPorId(Long id) {
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Veiculo com ID " + id + " nao encontrado"));
    }

    @Transactional
    public Veiculo salvar(Veiculo veiculo) {
        if (veiculo.getId() == null) {
            return veiculoRepository.save(veiculo);
        }
        return veiculoRepository.update(veiculo);
    }

    @Transactional
    public void remover(Long id) {
        Veiculo veiculo = obterPorId(id);
        veiculoRepository.delete(veiculo);
    }
}
