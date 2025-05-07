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
    
    if (!paciente || !paciente.secretaria) {
        alert('Dados do paciente não encontrados!');
        window.location.href = 'secretaria.html';
        return;
    }
    
    // Exibir dados da secretaria
    const dadosSecretaria = document.getElementById('dadosSecretaria');
    dadosSecretaria.innerHTML = `
        <h3>Dados do Paciente</h3>
        <p><strong>Nome:</strong> ${paciente.secretaria.nome}</p>
        <p><strong>Data da Cirurgia:</strong> ${paciente.secretaria.dataCirurgia}</p>
        <p><strong>Procedimento:</strong> ${paciente.secretaria.procedimento}</p>
        <p><strong>Cirurgião:</strong> ${paciente.secretaria.cirurgiao}</p>
        <p><strong>Convênio:</strong> ${paciente.secretaria.convenio}</p>
    `;
    
    // Configurar eventos para campos Sim/Não
    configurarCamposSimNao('alergia', 'alergiaDetalhes');
    configurarCamposSimNao('medicacao', 'medicacaoDetalhes');
    configurarCamposSimNao('problemaSaude', 'problemaSaudeDetalhes');
    configurarCamposSimNao('fuma', 'fumaDetalhes');
    configurarCamposSimNao('bebe', 'bebeDetalhes');
    configurarCamposSimNao('drogas', 'drogasDetalhes');
    
    const form = document.getElementById('formPaciente');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dados = {
            peso: document.getElementById('peso').value,
            altura: document.getElementById('altura').value,
            alergia: document.querySelector('input[name="alergia"]:checked').value,
            alergiaQual: document.getElementById('alergiaQual')?.value || '',
            medicacao: document.querySelector('input[name="medicacao"]:checked').value,
            medicacaoQual: document.getElementById('medicacaoQual')?.value || '',
            problemaSaude: document.querySelector('input[name="problemaSaude"]:checked').value,
            problemaSaudeQual: document.getElementById('problemaSaudeQual')?.value || '',
            fuma: document.querySelector('input[name="fuma"]:checked').value,
            fumaQuantidade: document.getElementById('fumaQuantidade')?.value || '',
            bebe: document.querySelector('input[name="bebe"]:checked').value,
            bebeFrequencia: document.getElementById('bebeFrequencia')?.value || '',
            drogas: document.querySelector('input[name="drogas"]:checked').value,
            drogasQual: document.getElementById('drogasQual')?.value || ''
        };
        
        if (atualizarPaciente(idPaciente, dados)) {
            window.location.href = `anestesista.html?id=${idPaciente}`;
        } else {
            alert('Erro ao atualizar dados do paciente!');
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