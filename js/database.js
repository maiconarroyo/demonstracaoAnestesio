// Banco de dados "simulado"
let pacientes = [];

// Dados da secretaria
function adicionarPacienteSecretaria(dados) {
    pacientes.push({
        secretaria: dados,
        paciente: null,
        anestesista: null
    });
    return pacientes.length - 1; // Retorna o ID do paciente
}

// Dados do paciente
function atualizarPaciente(id, dados) {
    if (pacientes[id]) {
        pacientes[id].paciente = dados;
        return true;
    }
    return false;
}

// Dados do anestesista
function atualizarAnestesista(id, dados) {
    if (pacientes[id]) {
        pacientes[id].anestesista = dados;
        return true;
    }
    return false;
}

// Obter paciente por ID
function obterPaciente(id) {
    return pacientes[id] || null;
}

// Obter todos os pacientes
function obterTodosPacientes() {
    return pacientes;
}