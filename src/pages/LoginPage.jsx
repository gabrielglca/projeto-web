import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Pequena simulação de delay para parecer mais real e profissional
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    }, 800);
  };

  return (
    <div className="bg-gradient-primary min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #4e73df 0%, #224abe 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  {/* Lado Esquerdo - Ilustrativo / Apresentação */}
                  <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5" style={{ backgroundColor: '#2e59d9' }}>
                    <div className="text-center mb-4">
                      <i className="fas fa-clinic-medical fa-4x mb-3 text-white-50"></i>
                      <h3 className="font-weight-bold">MedClinic</h3>
                      <p className="text-white-50 small">Sistema de Gestão Clínica Integrada</p>
                    </div>
                    <div className="px-4 text-center">
                      <p className="lead font-weight-light">Gerencie pacientes, consultas e prontuários em um só lugar de forma simples e rápida.</p>
                    </div>
                  </div>

                  {/* Lado Direito - Formulário */}
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center mb-4">
                        <h1 className="h4 text-gray-900 mb-2 font-weight-bold">Bem-vindo de volta!</h1>
                        <p className="text-muted small">Faça login para acessar sua conta acadêmica</p>
                      </div>

                      {error && (
                        <div className="alert alert-danger alert-dismissible fade show text-center py-2 px-3 small mb-4" role="alert">
                          <i className="fas fa-exclamation-triangle mr-2"></i> {error}
                        </div>
                      )}

                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <label className="text-xs font-weight-bold text-gray-700 ml-1">E-mail de Acesso</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text bg-light border-right-0">
                                <i className="fas fa-envelope text-gray-400"></i>
                              </span>
                            </div>
                            <input
                              type="email"
                              className="form-control form-control-user border-left-0 pl-1"
                              placeholder="exemplo@clinica.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              disabled={loading}
                              style={{ borderRadius: '0 10px 10px 0' }}
                            />
                          </div>
                          <span className="text-muted text-xs d-block mt-1 ml-1">Para testes: admin@clinica.com</span>
                        </div>

                        <div className="form-group mb-4">
                          <label className="text-xs font-weight-bold text-gray-700 ml-1">Senha</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text bg-light border-right-0">
                                <i className="fas fa-lock text-gray-400"></i>
                              </span>
                            </div>
                            <input
                              type="password"
                              className="form-control form-control-user border-left-0 pl-1"
                              placeholder="******"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              disabled={loading}
                              style={{ borderRadius: '0 10px 10px 0' }}
                            />
                          </div>
                          <span className="text-muted text-xs d-block mt-1 ml-1">Para testes: 123456</span>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block font-weight-bold shadow-sm py-2"
                          disabled={loading}
                          style={{ borderRadius: '10px' }}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                              Entrando...
                            </>
                          ) : (
                            'Acessar Sistema'
                          )}
                        </button>
                      </form>

                      <hr />

                      <div className="text-center mt-3">
                        <span className="text-xs text-muted">
                          Clínica Médica Acadêmica &copy; {new Date().getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
