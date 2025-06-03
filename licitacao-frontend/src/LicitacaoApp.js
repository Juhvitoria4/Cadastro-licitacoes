import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Atenção: rota api em minúsculo para evitar problemas
const apiBaseUrl = 'http://localhost:5046/api/licitacao';

function LicitacaoApp() {
  const [licitacoes, setLicitacoes] = useState([]);
  const [form, setForm] = useState({
    CodigoComprador: '',
    DataHoraAberturaProcesso: '',
    DataHoraInicioPropostas: '',
    DataHoraFimPropostas: '',
    Observacoes: '',
    Resumo: '',
    NumeroLicitacao: '',
  });

  // Buscar licitações
  useEffect(() => {
    fetchLicitacoes();
  }, []);

  const fetchLicitacoes = async () => {
    try {
      const response = await axios.get(apiBaseUrl);
      console.log('Licitações carregadas:', response.data);
      setLicitacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar licitações:', error);
      alert('Erro ao carregar licitações');
    }
  };

  // Manipular input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Criar licitação
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        DataHoraCadastro: new Date().toISOString(),
        DataHoraAberturaProcesso: new Date(form.DataHoraAberturaProcesso).toISOString(),
        DataHoraInicioPropostas: new Date(form.DataHoraInicioPropostas).toISOString(),
        DataHoraFimPropostas: new Date(form.DataHoraFimPropostas).toISOString(),
      };
      console.log('Enviando payload:', payload);
      await axios.post(apiBaseUrl, payload);
      alert('Licitação criada!');
      setForm({
        CodigoComprador: '',
        DataHoraAberturaProcesso: '',
        DataHoraInicioPropostas: '',
        DataHoraFimPropostas: '',
        Observacoes: '',
        Resumo: '',
        NumeroLicitacao: '',
      });
      fetchLicitacoes();
    } catch (error) {
      console.error('Erro ao criar licitação:', error);
      alert('Erro ao criar licitação');
    }
  };

  // Deletar licitação
  const handleDelete = async (id) => {
    if (!window.confirm('Confirma exclusão?')) return;

    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      alert('Licitação excluída');
      fetchLicitacoes();
    } catch (error) {
      console.error('Erro ao excluir licitação:', error);
      alert('Erro ao excluir licitação');
    }
  };

 return (
  <div style={{ maxWidth: 800, margin: 'auto', padding: 20, color: '#20B2AA' }}>
    <h1>Cadastro de Licitações</h1>

    <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
      <h3>Nova Licitação</h3>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="CodigoComprador" style={{ display: 'block', marginBottom: 5 }}>
          Código Comprador
        </label>
        <input
          type="text"
          id="CodigoComprador"
          name="CodigoComprador"
          value={form.CodigoComprador}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="DataHoraAberturaProcesso" style={{ display: 'block', marginBottom: 5 }}>
          Data e Hora Abertura Processo
        </label>
        <input
          type="datetime-local"
          id="DataHoraAberturaProcesso"
          name="DataHoraAberturaProcesso"
          value={form.DataHoraAberturaProcesso}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="DataHoraInicioPropostas" style={{ display: 'block', marginBottom: 5 }}>
          Data e Hora Início Propostas
        </label>
        <input
          type="datetime-local"
          id="DataHoraInicioPropostas"
          name="DataHoraInicioPropostas"
          value={form.DataHoraInicioPropostas}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="DataHoraFimPropostas" style={{ display: 'block', marginBottom: 5 }}>
          Data e Hora Fim Propostas
        </label>
        <input
          type="datetime-local"
          id="DataHoraFimPropostas"
          name="DataHoraFimPropostas"
          value={form.DataHoraFimPropostas}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="Resumo" style={{ display: 'block', marginBottom: 5 }}>
          Resumo
        </label>
        <input
          type="text"
          id="Resumo"
          name="Resumo"
          value={form.Resumo}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="NumeroLicitacao" style={{ display: 'block', marginBottom: 5 }}>
          Número Licitação
        </label>
        <input
          type="text"
          id="NumeroLicitacao"
          name="NumeroLicitacao"
          value={form.NumeroLicitacao}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="Observacoes" style={{ display: 'block', marginBottom: 5 }}>
          Observações
        </label>
        <input
          type="text"
          id="Observacoes"
          name="Observacoes"
          value={form.Observacoes}
          onChange={handleChange}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <button type="submit" style={{ padding: '10px 20px' }}>
        Cadastrar
      </button>
    </form>

    <h3>Licitações Cadastradas</h3>

    <table border="1" cellPadding="5" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Resumo</th>
          <th>Número</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {licitacoes.map((l) => (
          <tr key={l.id}>
            <td>{l.id}</td>
            <td>{l.resumo}</td>
            <td>{l.numeroLicitacao}</td>
            <td>
              <button onClick={() => handleDelete(l.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

export default LicitacaoApp;
