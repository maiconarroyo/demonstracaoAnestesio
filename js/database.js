// Armazenamento de dados
const database = {
    consultas: [],
    pacientes: [],
    anestesistas: []
  };
  
  // Funções para manipulação dos dados
  function salvarConsulta(consulta) {
    database.consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(database.consultas));
  }
  
  function salvarPaciente(paciente) {
    database.pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(database.pacientes));
  }
  
  function salvarAnestesista(anestesista) {
    database.anestesistas.push(anestesista);
    localStorage.setItem('anestesistas', JSON.stringify(database.anestesistas));
  }
  
  // Carregar dados do localStorage ao iniciar
  function carregarDados() {
    const consultasSalvas = localStorage.getItem('consultas');
    const pacientesSalvos = localStorage.getItem('pacientes');
    const anestesistasSalvos = localStorage.getItem('anestesistas');
  
    if (consultasSalvas) database.consultas = JSON.parse(consultasSalvas);
    if (pacientesSalvos) database.pacientes = JSON.parse(pacientesSalvos);
    if (anestesistasSalvos) database.anestesistas = JSON.parse(anestesistasSalvos);
  }
  
  // Inicializar
  carregarDados();