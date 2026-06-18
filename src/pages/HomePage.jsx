import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../utils/db';

function HomePage() {
  const [stats, setStats] = useState({
    pacientes: 0,
    medicos: 0,
    consultas: 0,
    receitas: 0
  });

  useEffect(() => {
    setStats({
      pacientes: db.pacientes.getAll().length,
      medicos: db.medicos.getAll().length,
      consultas: db.consultas.getAll().length,
      receitas: db.receitas.getAll().length
    });
  }, []);

  return (
    <div className="container-fluid py-2">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 font-weight-bold">Dashboard Geral</h1>
        <span className="text-muted text-xs">Atualizado em tempo real</span>
      </div>

      {/* Cartões de Indicadores */}
      <div className="row">
        {/* Pacientes */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow-sm h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Pacientes Cadastrados
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.pacientes}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-injured fa-2x text-gray-300"></i>
                </div>
              </div>
              <Link to="/pacientes" className="text-xs text-primary font-weight-bold d-block mt-2 text-decoration-none">
                Gerenciar Pacientes <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Médicos */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow-sm h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Corpo Clínico (Médicos)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.medicos}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-md fa-2x text-gray-300"></i>
                </div>
              </div>
              <Link to="/medicos" className="text-xs text-success font-weight-bold d-block mt-2 text-decoration-none">
                Ver Corpo Clínico <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Consultas */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow-sm h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Consultas Agendadas
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.consultas}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar-alt fa-2x text-gray-300"></i>
                </div>
              </div>
              <Link to="/consultas" className="text-xs text-info font-weight-bold d-block mt-2 text-decoration-none">
                Ver Agenda <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Receitas */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow-sm h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Prescrições Emitidas
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.receitas}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-file-prescription fa-2x text-gray-300"></i>
                </div>
              </div>
              <Link to="/receitas" className="text-xs text-warning font-weight-bold d-block mt-2 text-decoration-none">
                Ver Prescrições <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Informativa de Boas-Vindas */}
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="font-weight-bold text-primary mb-2">Bem-vindo ao MedClinic!</h5>
              <p className="text-gray-700">
                Este é o seu painel de controle administrativo. Utilize o menu lateral para gerenciar os cadastros de 
                pacientes, médicos, organizar consultas e emitir receitas médicas de forma integrada.
              </p>
              <div className="alert alert-info d-inline-block py-2 px-3 mb-0 text-xs">
                <i className="fas fa-info-circle mr-2"></i>
                Os dados deste sistema estão sendo salvos localmente e persistem mesmo após recarregar a página.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;