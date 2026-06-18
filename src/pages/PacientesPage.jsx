import React, { useState, useEffect } from 'react';
import { db } from '../utils/db';

function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [alergias, setAlergias] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = () => {
    setPacientes(db.pacientes.getAll());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { nome, cpf, dataNascimento, telefone, alergias };

    if (editingId) {
      db.pacientes.update(editingId, payload);
    } else {
      db.pacientes.create(payload);
    }

    clearForm();
    loadPacientes();
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setNome(p.nome);
    setCpf(p.cpf);
    setDataNascimento(p.dataNascimento);
    setTelefone(p.telefone);
    setAlergias(p.alergias);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      db.pacientes.delete(id);
      loadPacientes();
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setNome('');
    setCpf('');
    setDataNascimento('');
    setTelefone('');
    setAlergias('');
    setShowForm(false);
  };

  const filteredPacientes = pacientes.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cpf.includes(searchTerm)
  );

  return (
    <div className="container-fluid py-2">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          <i className="fas fa-user-injured text-primary mr-2"></i>
          Cadastro de Pacientes
        </h1>
        <button
          className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'} shadow-sm`}
          onClick={() => {
            if (showForm) clearForm();
            else setShowForm(true);
          }}
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'} mr-1`}></i>
          {showForm ? 'Cancelar' : 'Novo Paciente'}
        </button>
      </div>

      {showForm && (
        <div className="card shadow mb-4">
          <div className="card-header py-3 bg-light d-flex justify-content-between align-items-center">
            <h6 className="m-0 font-weight-bold text-primary">
              {editingId ? 'Editar Paciente' : 'Novo Registro de Paciente'}
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
                    placeholder="Ex: Carlos Santos"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold text-xs">CPF</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: 123.456.789-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold text-xs">Data de Nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold text-xs">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: (61) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group mt-2">
                <label className="font-weight-bold text-xs">Alergias / Restrições Médicas</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Descreva alergias se houver, ou coloque 'Nenhuma'"
                  value={alergias}
                  onChange={(e) => setAlergias(e.target.value)}
                ></textarea>
              </div>

              <div className="mt-4 text-right">
                <button type="button" className="btn btn-secondary mr-2" onClick={clearForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success px-4">
                  <i className="fas fa-save mr-1"></i> Salvar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow mb-4">
        <div className="card-header py-3 bg-white d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Lista de Pacientes Cadastrados</h6>
          <div className="input-group style-group" style={{ maxWidth: '250px' }}>
            <div className="input-group-prepend">
              <span className="input-group-text bg-light border-right-0 py-0 px-2 d-flex align-items-center">
                <i className="fas fa-search text-gray-400"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-sm border-left-0"
              placeholder="Buscar por nome..."
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
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Nascimento</th>
                  <th>Telefone</th>
                  <th>Alergias</th>
                  <th className="text-center" style={{ width: '150px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPacientes.length > 0 ? (
                  filteredPacientes.map((p) => (
                    <tr key={p.id}>
                      <td className="font-weight-bold text-gray-800">{p.nome}</td>
                      <td>{p.cpf}</td>
                      <td>{p.dataNascimento ? new Date(p.dataNascimento + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}</td>
                      <td>{p.telefone}</td>
                      <td>
                        {p.alergias && p.alergias.toLowerCase() !== 'nenhuma' ? (
                          <span className="badge badge-warning text-dark">{p.alergias}</span>
                        ) : (
                          <span className="text-muted small">Nenhuma</span>
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-info mr-1"
                          onClick={() => handleEdit(p)}
                          title="Editar Paciente"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(p.id)}
                          title="Excluir Paciente"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      Nenhum paciente cadastrado ou correspondente à busca.
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

export default PacientesPage;
