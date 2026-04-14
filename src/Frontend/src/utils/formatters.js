// src/utils/formatters.js

// Formata a data do Java (LocalDateTime) para o padrão brasileiro
export const formatarData = (dataString) => {
  if (!dataString) return '';
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

// Formata números para Moeda (R$)
export const formatarMoeda = (valor) => {
  if (valor === undefined || valor === null) return '';
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Coloca a máscara no CPF (123.456.789-00)
export const formatarCPF = (cpf) => {
  if (!cpf) return '';
  cpf = cpf.replace(/\D/g, ''); // Remove tudo que não é número
  if (cpf.length === 11) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return cpf;
};

// Formata a placa do carro (ABC-1234 ou ABC1D23)
export const formatarPlaca = (placa) => {
  if (!placa) return '';
  let formatada = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (formatada.length === 7) {
    return formatada.slice(0, 3) + '-' + formatada.slice(3);
  }
  return formatada;
};