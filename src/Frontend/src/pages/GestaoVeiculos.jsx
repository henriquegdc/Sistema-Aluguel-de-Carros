import { useState, useEffect } from 'react';
import api from '../services/api';

export default function GestaoVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [editing, setEditing] = useState(null); // Guarda o veículo que está sendo editado
  const [form, setForm] = useState({ matricula: '', marca: '', modelo: '', placa: '', ano: '', disponivel: true });

  useEffect(() => { carregarVeiculos(); }, []);

  const carregarVeiculos = async () => {
    const res = await api.get('/veiculos');
    setVeiculos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/veiculos/${editing}`, form);
      } else {
        await api.post('/veiculos', form);
      }
      alert('Veículo salvo com sucesso!');
      setEditing(null);
      setForm({ matricula: '', marca: '', modelo: '', placa: '', ano: '', disponivel: true });
      carregarVeiculos();
    } catch (err) { alert('Erro ao salvar veículo.'); }
  };

  const handleEdit = (v) => {
    setEditing(v.id);
    setForm({ ...v });
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Remover este veículo?")) return;
    await api.delete(`/veiculos/${id}`);
    carregarVeiculos();
  };

  return (
    <div style={{padding: '30px'}}>
      <h2>Gestão de Frota</h2>
      
      {/* Formulário de Cadastro/Edição */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>{editing ? 'Editar Veículo' : 'Novo Veículo'}</h3>
        <div style={styles.row}>
          <input placeholder="Marca" value={form.marca} onChange={e => setForm({...form, marca: e.target.value})} required style={styles.input}/>
          <input placeholder="Modelo" value={form.modelo} onChange={e => setForm({...form, modelo: e.target.value})} required style={styles.input}/>
        </div>
        <div style={styles.row}>
          <input placeholder="Placa" value={form.placa} onChange={e => setForm({...form, placa: e.target.value})} required style={styles.input}/>
          <input placeholder="Matrícula" value={form.matricula} onChange={e => setForm({...form, matricula: e.target.value})} required style={styles.input}/>
          <input placeholder="Ano" type="number" value={form.ano} onChange={e => setForm({...form, ano: e.target.value})} required style={styles.input}/>
        </div>
        <button type="submit" style={styles.saveBtn}>{editing ? 'Atualizar' : 'Cadastrar Veículo'}</button>
        {editing && <button type="button" onClick={() => setEditing(null)}>Cancelar</button>}
      </form>

      {/* Tabela de Listagem */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Marca/Modelo</th>
            <th>Placa</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map(v => (
            <tr key={v.id}>
              <td>{v.marca} {v.modelo} ({v.ano})</td>
              <td>{v.placa}</td>
              <td>{v.disponivel ? '✅ Disponível' : '❌ Alugado'}</td>
              <td>
                <button onClick={() => handleEdit(v)}>Editar</button>
                <button onClick={() => handleDeletar(v.id)} style={{color: 'red'}}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  form: { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' },
  row: { display: 'flex', gap: '10px', marginBottom: '10px' },
  input: { flex: 1, padding: '8px' },
  saveBtn: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' }
};