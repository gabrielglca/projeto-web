import React, { useState, useEffect } from 'react';
import { db } from '../utils/db';

function ConsultasPage() {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const [pacienteId, setPacienteId] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [status, setStatus] = useState('Agendada');
  const [observacoes, setObservacoes] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setConsultas(db.consultas.getAll());
    setPacientes(db.pacientes.getAll());
    setMedicos(db.medicos.getAll());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { pacienteId, medicoId, data, hora, status, observacoes };

    if (editingId) {
      db.consultas.update(editingId, payload);
    } else {
      db.consultas.create(payload);
    }

    clearForm();
    loadData();
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setPacienteId(c.pacienteId);
    setMedicoId(c.medicoId);
    setData(c.data);
    setHora(c.hora);
    setStatus(c.status);
    setObservacoes(c.observacoes);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente cancelar/excluir este agendamento de consulta?')) {
      db.consultas.delete(id);
      loadData();
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setPacienteId('');
    setMedicoId('');
    setData('');
    setHora('');
    setStatus('Agendada');
    setObservacoes('');
    setShowForm(false);
  };

  // Mapeamento auxiliar para exibir nomes na listagem
  const getPacienteNome = (id) => {
    const p = pacientes.find(item => item.id === id);
    return p ? p.nome : 'Paciente Não Encontrado';
  };

  const getMedicoNome = (id) => {
    const m = medicos.find(item => item.id === id);
    return m ? m.nome : 'Médico Não Encontrado';
  };

  const filteredConsultas = consultas.filter(c => {
    const pacNome = getPacienteNome(c.pacienteId).toLowerCase();
    const medNome = getMedicoNome(c.medicoId).toLowerCase();
    return pacNome.includes(searchTerm.toLowerCase()) || medNome.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container-fluid py-2">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          <i className="fas fa-calendar-alt text-primary mr-2"></i>
          Agendamento de Consultas
        </h1>
        <button
          className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'} shadow-sm`}
          onClick={() => {
            if (showForm) clearForm();
            else setShowForm(true);
          }}
          disabled={pacientes.length === 0 || medicos.length === 0}
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'} mr-1`}></i>
          {showForm ? 'Cancelar' : 'Agendar Consulta'}
        </button>
      </div>

      {pacientes.length === 0 || medicos.length === 0 ? (
        <div className="alert alert-warning shadow-sm mb-4">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <strong>Aviso:</strong> Você precisa cadastrar pelo menos um <strong>Paciente</strong> e um <strong>Médico</strong> para poder realizar um agendamento.
        </div>
      ) : null}

      {showForm && (
        <div className="card shadow mb-4">
          <div className="card-header py-3 bg-light d-flex justify-content-between align-items-center">
            <h6 className="m-0 font-weight-bold text-primary">
              {editingId ? 'Reagendar / Editar Consulta' : 'Novo Agendamento de Consulta'}
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold text-xs">Paciente</label>
                  <select
                    className="form-control"
                    value={pacienteId}
                    onChange={(e) => setPacienteId(e.target.value)}
                    required
                  >
                    <option value="">Selecione o Paciente...</option>
                    {pacientes.map(p => (
                      <option key={p.id} value={p.id}>{p.nome} (CPF: {p.cpf})</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold text-xs">Médico / Especialista</label>
                  <select
                    className="form-control"
                    value={medicoId}
                    onChange={(e) => setMedicoId(e.target.value)}
                    required
                  >
                    <option value="">Selecione o Médico...</option>
                    {medicos.map(m => (
                      <option key={m.id} value={m.id}>{m.nome} - {m.especialidade}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold text-xs">Data</label>
                  <input
                    type="date"
                    className="form-control"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold text-xs">Horário</label>
                  <input
                    type="time"
                    className="form-control"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold text-xs">Status</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="Agendada">Agendada</option>
                    <option value="Confirmada">Confirmada</option>
                    <option value="Realizada">Realizada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              <div className="form-group mt-2">
                <label className="font-weight-bold text-xs">Motivo da Consulta / Sintomas / Observações</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Ex: Dor de cabeça persistente, retorno de exames..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                ></textarea>
              </div>

              <div className="mt-4 text-right">
                <button type="button" className="btn btn-secondary mr-2" onClick={clearForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success px-4">
                  <i className="fas fa-save mr-1"></i> Salvar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow mb-4">
        <div className="card-header py-3 bg-white d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Agenda de Consultas</h6>
          <div className="input-group style-group" style={{ maxWidth: '250px' }}>
            <div className="input-group-prepend">
              <span className="input-group-text bg-light border-right-0 py-0 px-2 d-flex align-items-center">
                <i className="fas fa-search text-gray-400"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-sm border-left-0"
              placeholder="Buscar por Paciente/Médico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0" style={{ borderCollapse: 'collapse' }}>
              <thead className="thead-light">
                <tr>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Status</th>
                  <th>Observações</th>
                  <th className="text-center" style={{ width: '150px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsultas.length > 0 ? (
                  filteredConsultas.map((c) => {
                    let badgeClass = 'badge-secondary';
                    if (c.status === 'Confirmada') badgeClass = 'badge-info';
                    if (c.status === 'Realizada') badgeClass = 'badge-success';
                    if (c.status === 'Cancelada') badgeClass = 'badge-danger';
                    if (c.status === 'Agendada') badgeClass = 'badge-primary';

                    return (
                      <tr key={c.id}>
                        <td className="font-weight-bold text-gray-800">{getPacienteNome(c.pacienteId)}</td>
                        <td className="font-weight-bold text-primary">{getMedicoNome(c.medicoId)}</td>
                        <td>{c.data ? new Date(c.data + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}</td>
                        <td><span className="font-weight-bold">{c.hora}</span></td>
                        <td><span className={`badge ${badgeClass}`}>{c.status}</span></td>
                        <td className="small text-muted">{c.observacoes || '-'}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-info mr-1"
                            onClick={() => handleEdit(c)}
                            title="Editar Agendamento"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(c.id)}
                            title="Excluir/Cancelar Agendamento"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      Nenhuma consulta agendada ou correspondente à busca.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultasPage;
