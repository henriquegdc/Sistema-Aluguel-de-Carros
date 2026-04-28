package com.aluguelcarros.config;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.aluguelcarros.model.Veiculo;
import com.aluguelcarros.repository.VeiculoRepository;

import io.micronaut.context.event.StartupEvent;
import io.micronaut.runtime.event.annotation.EventListener;
import jakarta.inject.Singleton;

@Singleton
public class DatabaseSeeder {

    private static final Logger LOG = LoggerFactory.getLogger(DatabaseSeeder.class);
    private final VeiculoRepository veiculoRepository;

    public DatabaseSeeder(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    // Este método é acionado automaticamente assim que o Micronaut subir o servidor
    @EventListener
    public void onStartup(StartupEvent event) {
        // Verifica se o banco está vazio para não duplicar dados a cada reinicialização
        if (veiculoRepository.count() == 0) {
            LOG.info("Banco de dados vazio. Injetando carga inicial de veículos de luxo...");

            // Correção: Adicionado o valor do preço (7º parâmetro) em todos os veículos
            List<Veiculo> frotaLuxo = List.of(
                criarVeiculo("Porsche", "911 Carrera", 2023, "PRC-0911", "MAT-001", "https://images.unsplash.com/photo-1503376710362-808638721fe4?auto=format&fit=crop&w=800&q=80", "850.00"),
                criarVeiculo("Mercedes-Benz", "AMG GT", 2024, "AMG-0001", "MAT-002", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80", "950.00"),
                criarVeiculo("BMW", "M8 Competition", 2023, "BMW-0008", "MAT-003", "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=800&q=80", "890.00"),
                criarVeiculo("Audi", "RS e-tron GT", 2024, "AUD-2024", "MAT-004", "https://images.unsplash.com/photo-1614026480209-cd9934144671?auto=format&fit=crop&w=800&q=80", "920.00"),
                criarVeiculo("Tesla", "Model S Plaid", 2023, "TSL-0005", "MAT-005", "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80", "600.00"),
                criarVeiculo("Land Rover", "Range Rover Sport", 2024, "LRV-0006", "MAT-006", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bea?auto=format&fit=crop&w=800&q=80", "750.00"),
                criarVeiculo("Volvo", "XC90 Recharge", 2023, "VLV-0007", "MAT-007", "https://images.unsplash.com/photo-1615887023516-9faea07b3bc2?auto=format&fit=crop&w=800&q=80", "680.00"),
                criarVeiculo("Lexus", "LC 500", 2024, "LEX-0008", "MAT-008", "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=800&q=80", "820.00")
            );

            veiculoRepository.saveAll(frotaLuxo);
            LOG.info("8 Veículos de luxo cadastrados com sucesso!");
        }
    }

    private Veiculo criarVeiculo(String marca, String modelo, int ano, String placa, String matricula, String imgUrl, String valor) {
        Veiculo v = new Veiculo();
        v.setMarca(marca);
        v.setModelo(modelo);
        v.setAno(ano);
        v.setPlaca(placa);
        v.setMatricula(matricula);
        v.setImg(imgUrl); 
        v.setPreco(new java.math.BigDecimal(valor));
        
        return v;
    }
}