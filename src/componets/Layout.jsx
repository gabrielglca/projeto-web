// src/components/Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Layout() {
  const { user, logout } = useAuth();

  return (
    <div id="wrapper">
      {/* SIDEBAR (MENU LATERAL) */}
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" style={{ background: 'linear-gradient(180deg, #4e73df 10%, #224abe 100%)' }}>
        <Link className="sidebar-brand d-flex align-items-center justify-content-center my-3" to="/">
          <div className="sidebar-brand-icon">
            <i className="fas fa-clinic-medical"></i>
          </div>
          <div className="sidebar-brand-text mx-3">MedClinic</div>
        </Link>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* CADASTROS */}
        <hr className="sidebar-divider" />
        <div className="sidebar-heading text-white-50">Cadastros</div>

        <li className="nav-item">
          <Link className="nav-link" to="/pacientes">
            <i className="fas fa-fw fa-user-injured"></i>
            <span>Pacientes</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/medicos">
            <i className="fas fa-fw fa-user-md"></i>
            <span>Médicos</span>
          </Link>
        </li>

        {/* GESTÃO MÉDICA */}
        <hr className="sidebar-divider" />
        <div className="sidebar-heading text-white-50">Gestão Médica</div>

        <li className="nav-item">
          <Link className="nav-link" to="/consultas">
            <i className="fas fa-fw fa-calendar-alt"></i>
            <span>Consultas</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/receitas">
            <i className="fas fa-fw fa-file-prescription"></i>
            <span>Receitas Médicas</span>
          </Link>
        </li>

      </ul>

      {/* CONTEÚDO PRINCIPAL */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          
          {/* TOPBAR (BARRA SUPERIOR) */}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow-sm px-4">
            {/* Título ou Identificação */}
            <span className="navbar-brand mb-0 h1 text-gray-800 d-none d-md-inline-block" style={{ fontSize: '1.1rem' }}>
              Painel de Controle
            </span>

            {/* Lado Direito do Topbar */}
            <ul className="navbar-nav ml-auto align-items-center">
              <li className="nav-item dropdown no-arrow">
                <span className="mr-3 d-none d-lg-inline text-gray-600 small font-weight-bold">
                  <i className="fas fa-user-circle mr-1 text-primary"></i>
                  {user ? user.name : 'Usuário'}
                </span>
              </li>
              <div className="topbar-divider d-none d-sm-block"></div>
              <li className="nav-item">
                <button 
                  onClick={logout}
                  className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1 font-weight-bold transition-all"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Sair</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* ÁREA ONDE AS PÁGINAS MUDAM */}
          <div className="container-fluid">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Layout;
