document.addEventListener('DOMContentLoaded', function() {
    // Obter ID do paciente da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idPaciente = urlParams.get('id');
    
    if (!idPaciente) {
        alert('Paciente não encontrado!');
        window.location.href = 'secretaria.html';
        return;
    }
    
    const paciente = obterPaciente(idPaciente);
    
    if (!paciente || !paciente.secretaria || !paciente.paciente) {
        alert('Dados do paciente não encontrados!');
        window.location.href = 'secretaria.html';
        return;
    }
    
    // Exibir dados do paciente
    const dadosPaciente = document.getElementById('dadosPaciente');
    dadosPaciente.innerHTML = `
        <h3>Dados do Paciente</h3>
        <p><strong>Nome:</strong> ${paciente.secretaria.nome}</p>
        <p><strong>Data da Cirurgia:</strong> ${paciente.secretaria.dataCirurgia}</p>
        <p><strong>Procedimento:</strong> ${paciente.secretaria.procedimento}</p>
        <p><strong>Peso:</strong> ${paciente.paciente.peso} kg</p>
        <p><strong>Altura:</strong> ${paciente.paciente.altura} cm</p>
        <p><strong>Alergias:</strong> ${paciente.paciente.alergia === 'sim' ? paciente.paciente.alergiaQual : 'Nenhuma'}</p>
        <p><strong>Medicações:</strong> ${paciente.paciente.medicacao === 'sim' ? paciente.paciente.medicacaoQual : 'Nenhuma'}</p>
    `;
    
    // Configurar eventos para campos Sim/Não
    configurarCamposSimNao('exames', 'examesDetalhes');
    configurarCamposSimNao('preAnestesico', 'preAnestesicoDetalhes');
    
    const form = document.getElementById('formAnestesista');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dados = {
            pa: document.getElementById('pa').value,
            pulso: document.getElementById('pulso').value,
            temperatura: document.getElementById('temperatura').value,
            fc: document.getElementById('fc').value,
            respiracao: document.getElementById('respirarão').value,
            asa: document.getElementById('asa').value,
            mallampati: document.getElementById('mallampati').value,
            uti: document.querySelector('input[name="uti"]:checked').value,
            exames: document.querySelector('input[name="exames"]:checked').value,
            examesQual: document.getElementById('examesQual')?.value || '',
            preAnestesico: document.querySelector('input[name="preAnestesico"]:checked').value,
            preAnestesicoQual: document.getElementById('preAnestesicoQual')?.value || '',
            obs: document.getElementById('obs').value
        };
        
        if (atualizarAnestesista(idPaciente, dados)) {
            // Abrir relatório em nova aba
            window.open(`avaliacao.html?id=${idPaciente}`, '_blank');
        } else {
            alert('Erro ao atualizar dados do anestesista!');
        }
    });
});

function configurarCamposSimNao(nomeCampo, idDetalhes) {
    const radios = document.querySelectorAll(`input[name="${nomeCampo}"]`);
    const detalhes = document.getElementById(idDetalhes);
    
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'sim') {
                detalhes.style.display = 'block';
            } else {
                detalhes.style.display = 'none';
            }
        });
    });
}