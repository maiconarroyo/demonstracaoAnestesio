// Armazena os dados dos pacientes
let pacientes = [];

// Armazena as avaliações completas
let avaliacoes = [];

// Função para adicionar novo paciente
function adicionarPaciente(paciente) {
    pacientes.push(paciente);
    console.log('Paciente adicionado:', paciente);
    console.log('Lista de pacientes:', pacientes);
    return paciente;
}

// Função para atualizar dados do paciente
function atualizarPaciente(id, dados) {
    const pacienteIndex = pacientes.findIndex(p => p.id === id);
    if (pacienteIndex !== -1) {
        pacientes[pacienteIndex] = {...pacientes[pacienteIndex], ...dados};
        return pacientes[pacienteIndex];
    }
    return null;
}

// Função para adicionar avaliação
function adicionarAvaliacao(avaliacao) {
    avaliacoes.push(avaliacao);
    return avaliacao;
}

// Função para buscar paciente por ID
function buscarPaciente(id) {
    return pacientes.find(p => p.id === id);
}

export { pacientes, avaliacoes, adicionarPaciente, atualizarPaciente, adicionarAvaliacao, buscarPaciente };