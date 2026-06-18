import React, { useState, useEffect } from 'react';
import { db } from '../utils/db';

function MedicosPage() {
  const [medicos, setMedicos] = useState([]);
  const [nome, setNome] = useState('');
  const [crm, setCrm] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadMedicos();
  }, []);

  const loadMedicos = () => {
    setMedicos(db.medicos.getAll());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { nome, crm, especialidade, telefone, email };

    if (editingId) {
      db.medicos.update(editingId, payload);
    } else {
      db.medicos.create(payload);
    }

    clearForm();
    loadMedicos();
  };

  const handleEdit = (m) => {
    setEditingId(m.id);
    setNome(m.nome);
    setCrm(m.crm);
    setEspecialidade(m.especialidade);
    setTelefone(m.telefone);
    setEmail(m.email);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      db.medicos.delete(id);
      loadMedicos();
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setNome('');
    setCrm('');
    setEspecialidade('');
    setTelefone('');
    setEmail('');
    setShowForm(false);
  };

  const filteredMedicos = medicos.filter(m =>
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-2">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          <i className="fas fa-user-md text-primary mr-2"></i>
          Cadastro de Médicos
        </h1>
        <button
          className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'} shadow-sm`}
          onClick={() => {
            if (showForm) clearForm();
            else setShowForm(true);
          }}
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'} mr-1`}></i>
          {showForm ? 'Cancelar' : 'Novo Médico'}
        </button>
      </div>

      {showForm && (
        <div className="card shadow mb-4">
          <div className="card-header py-3 bg-light d-flex justify-content-between align-items-center">
            <h6 className="m-0 font-weight-bold text-primary">
              {editingId ? 'Editar Médico' : 'Novo Registro de Médico'}
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold text-xs">Nome Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: Dr. João Pedro"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold text-xs">CRM</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: CRM/DF 12345"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold text-xs">Especialidade</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: Cardiologia"
                    value={especialidade}
                    onChange={(e) => setEspecialidade(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold text-xs">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: (61) 98888-8888"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold text-xs">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ex: joao@clinica.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mt-4 text-right">
                <button type="button" className="btn btn-secondary mr-2" onClick={clearForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success px-4">
                  <i className="fas fa-save mr-1"></i> Salvar Médico
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow mb-4">
        <div className="card-header py-3 bg-white d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Corpo Clínico (Médicos)</h6>
          <div className="input-group style-group" style={{ maxWidth: '250px' }}>
            <div className="input-group-prepend">
              <span className="input-group-text bg-light border-right-0 py-0 px-2 d-flex align-items-center">
                <i className="fas fa-search text-gray-400"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-sm border-left-0"
              placeholder="Buscar por nome ou esp..."
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
                  <th>Nome do Médico</th>
                  <th>CRM</th>
                  <th>Especialidade</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th className="text-center" style={{ width: '150px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicos.length > 0 ? (
                  filteredMedicos.map((m) => (
                    <tr key={m.id}>
                      <td className="font-weight-bold text-gray-800">{m.nome}</td>
                      <td><span className="badge badge-secondary">{m.crm}</span></td>
                      <td className="font-weight-bold text-primary">{m.especialidade}</td>
                      <td>{m.telefone}</td>
                      <td>{m.email}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-info mr-1"
                          onClick={() => handleEdit(m)}
                          title="Editar Médico"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(m.id)}
                          title="Excluir Médico"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      Nenhum médico cadastrado ou correspondente à busca.
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

export default MedicosPage;
