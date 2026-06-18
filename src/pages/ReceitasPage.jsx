import React, { useState, useEffect } from 'react';
import { db } from '../utils/db';

function ReceitasPage() {
  const [receitas, setReceitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const [pacienteId, setPacienteId] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [medicamentos, setMedicamentos] = useState('');
  const [data, setData] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setReceitas(db.receitas.getAll());
    setPacientes(db.pacientes.getAll());
    setMedicos(db.medicos.getAll());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { pacienteId, medicoId, medicamentos, data };

    if (editingId) {
      db.receitas.update(editingId, payload);
    } else {
      db.receitas.create(payload);
    }

    clearForm();
    loadData();
  };

  const handleEdit = (r) => {
    setEditingId(r.id);
    setPacienteId(r.pacienteId);
    setMedicoId(r.medicoId);
    setMedicamentos(r.medicamentos);
    setData(r.data);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente excluir esta receita médica?')) {
      db.receitas.delete(id);
      loadData();
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setPacienteId('');
    setMedicoId('');
    setMedicamentos('');
    setData('');
    setShowForm(false);
  };

  const getPacienteNome = (id) => {
    const p = pacientes.find(item => item.id === id);
    return p ? p.nome : 'Paciente Não Encontrado';
  };

  const getMedicoNome = (id) => {
    const m = medicos.find(item => item.id === id);
    return m ? m.nome : 'Médico Não Encontrado';
  };

  const filteredReceitas = receitas.filter(r => {
    const pacNome = getPacienteNome(r.pacienteId).toLowerCase();
    const medNome = getMedicoNome(r.medicoId).toLowerCase();
    return pacNome.includes(searchTerm.toLowerCase()) || medNome.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container-fluid py-2">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          <i className="fas fa-file-prescription text-primary mr-2"></i>
          Receitas Médicas / Prescrições
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
          {showForm ? 'Cancelar' : 'Nova Receita'}
        </button>
      </div>

      {pacientes.length === 0 || medicos.length === 0 ? (
        <div className="alert alert-warning shadow-sm mb-4">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <strong>Aviso:</strong> Você precisa cadastrar pelo menos um <strong>Paciente</strong> e um <strong>Médico</strong> para poder emitir uma receita médica.
        </div>
      ) : null}

      {showForm && (
        <div className="card shadow mb-4">
          <div className="card-header py-3 bg-light d-flex justify-content-between align-items-center">
            <h6 className="m-0 font-weight-bold text-primary">
              {editingId ? 'Editar Receita Médica' : 'Emitir Nova Receita Médica'}
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold text-xs">Paciente Destinatário</label>
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
                  <label className="font-weight-bold text-xs">Médico Prescritor</label>
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
                  <label className="font-weight-bold text-xs">Data de Emissão</label>
                  <input
                    type="date"
                    className="form-control"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group mt-2">
                <label className="font-weight-bold text-xs">Prescrição Médica (Medicamentos, Dosagem e Recomendações)</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Ex: 1. Amoxicilina 500mg - 1 comprimido de 8 em 8 horas por 7 dias.&#10;2. Dipirona 500mg - 1 comprimido se dor."
                  value={medicamentos}
                  onChange={(e) => setMedicamentos(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mt-4 text-right">
                <button type="button" className="btn btn-secondary mr-2" onClick={clearForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success px-4">
                  <i className="fas fa-save mr-1"></i> Salvar e Emitir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow mb-4">
        <div className="card-header py-3 bg-white d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Receitas Emitidas</h6>
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
                  <th>Médico Prescritor</th>
                  <th>Data Emissão</th>
                  <th>Medicamentos / Posologia</th>
                  <th className="text-center" style={{ width: '150px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredReceitas.length > 0 ? (
                  filteredReceitas.map((r) => (
                    <tr key={r.id}>
                      <td className="font-weight-bold text-gray-800">{getPacienteNome(r.pacienteId)}</td>
                      <td className="font-weight-bold text-primary">{getMedicoNome(r.medicoId)}</td>
                      <td>{r.data ? new Date(r.data + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}</td>
                      <td>
                        <pre className="mb-0 text-gray-700" style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
                          {r.medicamentos}
                        </pre>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-info mr-1"
                          onClick={() => handleEdit(r)}
                          title="Editar Receita"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(r.id)}
                          title="Excluir Receita"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      Nenhuma receita cadastrada ou correspondente à busca.
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

export default ReceitasPage;
