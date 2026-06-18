// src/utils/db.js

// Dados iniciais para demonstração se o localStorage estiver vazio
const initialPacientes = [
  { id: '1', nome: 'Ana Souza', cpf: '123.456.789-00', dataNascimento: '1990-05-15', telefone: '(61) 98765-4321', alergias: 'Dipirona' },
  { id: '2', nome: 'Carlos Oliveira', cpf: '987.654.321-11', dataNascimento: '1985-11-22', telefone: '(61) 91234-5678', alergias: 'Nenhuma' }
];

const initialMedicos = [
  { id: '1', nome: 'Dr. Gabriel Lucas', crm: 'DF-12345', especialidade: 'Cardiologia', telefone: '(61) 99988-7766', email: 'gabriel@clinica.com' },
  { id: '2', nome: 'Dra. Luisa Santos', crm: 'DF-54321', especialidade: 'Pediatria', telefone: '(61) 98877-6655', email: 'luisa@clinica.com' }
];

const initialConsultas = [
  { id: '1', pacienteId: '1', medicoId: '1', data: '2026-06-20', hora: '14:30', status: 'Agendada', observacoes: 'Retorno de rotina cardíaca' },
  { id: '2', pacienteId: '2', medicoId: '2', data: '2026-06-22', hora: '10:00', status: 'Confirmada', observacoes: 'Consulta de pediatria' }
];

const initialReceitas = [
  { id: '1', pacienteId: '1', medicoId: '1', medicamentos: 'Paracetamol 750mg - de 6 em 6 horas se febre ou dor.', data: '2026-06-16' },
  { id: '2', pacienteId: '2', medicoId: '2', medicamentos: 'Amoxicilina 250mg/5ml - tomar 5ml a cada 8 horas por 7 dias.', data: '2026-06-15' }
];

// Helper genérico para buscar do LocalStorage
const getStorageItem = (key, initialValue) => {
  let data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  }
  if (data.includes("William Silva") || data.includes("william@clinica.com")) {
    data = data.replace(/William Silva/g, "Gabriel Lucas").replace(/william@clinica.com/g, "gabriel@clinica.com");
    localStorage.setItem(key, data);
  }
  return JSON.parse(data);
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Funções de CRUD
export const db = {
  // PACIENTES (William)
  pacientes: {
    getAll: () => getStorageItem('db_pacientes', initialPacientes),
    saveAll: (data) => setStorageItem('db_pacientes', data),
    getById: (id) => db.pacientes.getAll().find(p => p.id === id),
    create: (paciente) => {
      const all = db.pacientes.getAll();
      const newPaciente = { ...paciente, id: Date.now().toString() };
      all.push(newPaciente);
      db.pacientes.saveAll(all);
      return newPaciente;
    },
    update: (id, updatedData) => {
      const all = db.pacientes.getAll();
      const index = all.findIndex(p => p.id === id);
      if (index !== -1) {
        all[index] = { ...all[index], ...updatedData };
        db.pacientes.saveAll(all);
        return all[index];
      }
      return null;
    },
    delete: (id) => {
      const all = db.pacientes.getAll();
      const filtered = all.filter(p => p.id !== id);
      db.pacientes.saveAll(filtered);
      // Opcional: remover consultas e receitas órfãs
    }
  },

  // MÉDICOS (William)
  medicos: {
    getAll: () => getStorageItem('db_medicos', initialMedicos),
    saveAll: (data) => setStorageItem('db_medicos', data),
    getById: (id) => db.medicos.getAll().find(m => m.id === id),
    create: (medico) => {
      const all = db.medicos.getAll();
      const newMedico = { ...medico, id: Date.now().toString() };
      all.push(newMedico);
      db.medicos.saveAll(all);
      return newMedico;
    },
    update: (id, updatedData) => {
      const all = db.medicos.getAll();
      const index = all.findIndex(m => m.id === id);
      if (index !== -1) {
        all[index] = { ...all[index], ...updatedData };
        db.medicos.saveAll(all);
        return all[index];
      }
      return null;
    },
    delete: (id) => {
      const all = db.medicos.getAll();
      const filtered = all.filter(m => m.id !== id);
      db.medicos.saveAll(filtered);
    }
  },

  // CONSULTAS (Luisa)
  consultas: {
    getAll: () => getStorageItem('db_consultas', initialConsultas),
    saveAll: (data) => setStorageItem('db_consultas', data),
    getById: (id) => db.consultas.getAll().find(c => c.id === id),
    create: (consulta) => {
      const all = db.consultas.getAll();
      const newConsulta = { ...consulta, id: Date.now().toString() };
      all.push(newConsulta);
      db.consultas.saveAll(all);
      return newConsulta;
    },
    update: (id, updatedData) => {
      const all = db.consultas.getAll();
      const index = all.findIndex(c => c.id === id);
      if (index !== -1) {
        all[index] = { ...all[index], ...updatedData };
        db.consultas.saveAll(all);
        return all[index];
      }
      return null;
    },
    delete: (id) => {
      const all = db.consultas.getAll();
      const filtered = all.filter(c => c.id !== id);
      db.consultas.saveAll(filtered);
    }
  },

  // RECEITAS (Luisa)
  receitas: {
    getAll: () => getStorageItem('db_receitas', initialReceitas),
    saveAll: (data) => setStorageItem('db_receitas', data),
    getById: (id) => db.receitas.getAll().find(r => r.id === id),
    create: (receita) => {
      const all = db.receitas.getAll();
      const newReceita = { ...receita, id: Date.now().toString() };
      all.push(newReceita);
      db.receitas.saveAll(all);
      return newReceita;
    },
    update: (id, updatedData) => {
      const all = db.receitas.getAll();
      const index = all.findIndex(r => r.id === id);
      if (index !== -1) {
        all[index] = { ...all[index], ...updatedData };
        db.receitas.saveAll(all);
        return all[index];
      }
      return null;
    },
    delete: (id) => {
      const all = db.receitas.getAll();
      const filtered = all.filter(r => r.id !== id);
      db.receitas.saveAll(filtered);
    }
  }
};
