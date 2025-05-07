document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroPaciente');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dados = {
            nome: document.getElementById('nome').value,
            dataCirurgia: document.getElementById('dataCirurgia').value,
            procedimento: document.getElementById('procedimento').value,
            cirurgiao: document.getElementById('cirurgiao').value,
            convenio: document.getElementById('convenio').value,
            dataNascimento: document.getElementById('dataNascimento').value,
            nomeMae: document.getElementById('nomeMae').value
        };
        
        const idPaciente = adicionarPacienteSecretaria(dados);
        
        window.location.href = `paciente.html?id=${idPaciente}`;
    });
});