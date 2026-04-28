import { useState, useEffect } from 'react';
import api from '../services/api';

export default function GestaoVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [erro, setErro] = useState(''); // Estado para capturar o erro exato do backend
  const [form, setForm] = useState({ 
    matricula: '', marca: '', modelo: '', placa: '', ano: '', disponivel: true, preco: '', img: '' 
  });

  useEffect(() => { carregarVeiculos(); }, []);

  const carregarVeiculos = async () => {
    try {
      const res = await api.get('/veiculos');
      setVeiculos(res.data);
    } catch (err) { 
      console.error("Erro ao listar veículos", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(''); // Limpa erros antigos

    try {
      // 1. O Java exige que o ano seja um Número Inteiro, e não um texto.
      const precoNumero = form.preco === '' ? null : Number(form.preco);
      const payload = {
        ...form,
        ano: parseInt(form.ano, 10), // Conversão forçada para evitar Bad Request (400)
        preco: Number.isNaN(precoNumero) ? null : precoNumero,
        img: form.img?.trim() || null
      };

      if (editing) {
        await api.put(`/veiculos/${editing}`, payload);
        alert('Veículo atualizado com sucesso!');
      } else {
        await api.post('/veiculos', payload);
        alert('Veículo cadastrado com sucesso!');
      }
      
      // Limpa o formulário após o sucesso
      setEditing(null);
      setForm({ matricula: '', marca: '', modelo: '', placa: '', ano: '', disponivel: true, preco: '', img: '' });
      carregarVeiculos();

    } catch (err) {
      // 2. Captura a mensagem de erro exata vinda do Micronaut/PostgreSQL
      const mensagemBackend = err.response?.data?.message || err.response?.data?.erro || err.message;
      setErro(`Erro ao salvar: ${mensagemBackend}`);
    }
  };

  const handleEdit = (v) => {
    setEditing(v.id);
    setForm({
      matricula: v.matricula ?? '',
      marca: v.marca ?? '',
      modelo: v.modelo ?? '',
      placa: v.placa ?? '',
      ano: v.ano ?? '',
      disponivel: v.disponivel ?? true,
      preco: v.preco ?? '',
      img: v.img ?? ''
    });
    window.scrollTo(0, 0); // Sobe a tela para o formulário
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este veículo permanentemente?")) return;
    try {
      await api.delete(`/veiculos/${id}`);
      carregarVeiculos();
    } catch (err) {
      alert("Erro ao excluir. O veículo pode estar vinculado a um pedido.");
    }
  };

  return (
    <div className="container">
      <h2>Gestão de Frota Automotiva</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Cadastre novos veículos ou atualize o status da frota existente.
      </p>

      {/* Caixa de Erro Visível */}
      {erro && (
        <div className="alert-error">
          <strong>Atenção: </strong> {erro}
        </div>
      )}
      
      {/* Formulário de Cadastro/Edição com Visual de Cartão */}
      <div className="card" style={{ marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>
          {editing ? '✏️ Editar Veículo Selecionado' : '🚗 Cadastrar Novo Veículo'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="form-group">
              <label>Marca</label>
              <input className="input" placeholder="Ex: Toyota" value={form.marca} onChange={e => setForm({...form, marca: e.target.value})} required />
            </div>
            
            <div className="form-group">
              <label>Modelo</label>
              <input className="input" placeholder="Ex: Corolla XEI" value={form.modelo} onChange={e => setForm({...form, modelo: e.target.value})} required />
            </div>

            <div className="form-group">
              <label>Placa (Única)</label>
              <input className="input" placeholder="ABC-1234" value={form.placa} onChange={e => setForm({...form, placa: e.target.value})} required />
            </div>

            <div className="form-group">
              <label>Matrícula (Única)</label>
              <input className="input" placeholder="Ex: 987654321" value={form.matricula} onChange={e => setForm({...form, matricula: e.target.value})} required />
            </div>

            <div className="form-group">
              <label>Ano de Fabricação</label>
              <input className="input" type="number" min="1990" max="2025" placeholder="Ex: 2022" value={form.ano} onChange={e => setForm({...form, ano: e.target.value})} required />
            </div>

            <div className="form-group">
              <label>Preço da Diária (R$)</label>
              <input className="input" type="number" min="0" step="0.01" placeholder="Ex: 250.00" value={form.preco} onChange={e => setForm({...form, preco: e.target.value})} />
            </div>

            <div className="form-group">
              <label>URL da Imagem</label>
              <input className="input" type="url" placeholder="https://..." value={form.img} onChange={e => setForm({...form, img: e.target.value})} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary">
              {editing ? 'Guardar Alterações' : 'Adicionar à Frota'}
            </button>
            {editing && (
              <button type="button" className="btn btn-outline" onClick={() => {
                setEditing(null);
                setForm({ matricula: '', marca: '', modelo: '', placa: '', ano: '', disponivel: true, preco: '', img: '' });
                setErro('');
              }}>
                Cancelar Edição
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabela de Listagem */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Veículo (Marca/Modelo)</th>
              <th>Placa</th>
              <th>Ano</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Nenhum veículo cadastrado na frota.</td></tr>
            ) : (
              veiculos.map(v => (
                <tr key={v.id}>
                  <td style={{ color: 'var(--text-muted)' }}>#{v.id}</td>
                  <td><strong>{v.marca}</strong> {v.modelo}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{v.placa}</td>
                  <td>{v.ano}</td>
                  <td>
                    <span className={`badge ${v.disponivel ? 'aprovado' : 'rejeitado'}`}>
                      {v.disponivel ? 'Disponível' : 'Alugado'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={() => handleEdit(v)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={() => handleDeletar(v.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}