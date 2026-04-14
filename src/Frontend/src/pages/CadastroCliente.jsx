import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function CadastroCliente() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  
  // Estado do formulário
  const [form, setForm] = useState({
    nome: '', cpf: '', rg: '', endereco: '', profissao: '', senha: '', rendimento: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    // Prepara o payload igual ao ClienteDTO do Micronaut
    const payload = {
      nome: form.nome,
      cpf: form.cpf,
      rg: form.rg,
      endereco: form.endereco,
      profissao: form.profissao,
      senha: form.senha,
      // O backend espera um array de rendimentos. Vamos enviar 1 valor por enquanto.
      rendimentos: [parseFloat(form.rendimento || 0)] 
    };

    try {
      await api.post('/auth/cadastro/cliente', payload);
      alert('Cadastro realizado com sucesso! Faça seu login.');
      navigate('/login'); // Manda o usuário para o login
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Criar Conta de Cliente</h2>
        {erro && <div style={styles.errorBox}>{erro}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="nome" placeholder="Nome Completo" required onChange={handleChange} style={styles.input} />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <input name="cpf" placeholder="CPF (Apenas números)" maxLength="11" required onChange={handleChange} style={styles.input} />
            <input name="rg" placeholder="RG" required onChange={handleChange} style={styles.input} />
          </div>

          <input name="endereco" placeholder="Endereço Completo" required onChange={handleChange} style={styles.input} />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <input name="profissao" placeholder="Profissão" required onChange={handleChange} style={styles.input} />
            <input name="rendimento" type="number" step="0.01" placeholder="Renda (R$)" required onChange={handleChange} style={styles.input} />
          </div>

          <input name="senha" type="password" placeholder="Crie uma senha" required onChange={handleChange} style={styles.input} />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Já tem conta? <Link to="/login">Entre aqui</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9' },
  card: { backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px', width: '100%', boxSizing: 'border-box' },
  button: { padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' },
  errorBox: { backgroundColor: '#ffe6e6', color: '#cc0000', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center' }
};