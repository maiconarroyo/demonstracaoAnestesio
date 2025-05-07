// Funções para manipulação dos formulários
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados do localStorage
    carregarDados();
    
    // Verificar em qual página estamos
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    // Configurar cada página
    if (page === 'secretaria.html') {
      configurarSecretaria();
    } else if (page === 'paciente.html') {
      configurarPaciente();
    } else if (page === 'anestesista.html') {
      configurarAnestesista();
    } else if (page === 'avaliacao.html') {
      configurarAvaliacao();
    }
  });
  
  function configurarSecretaria() {
    const form = document.getElementById('formConsulta');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const consulta = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        dataCirurgia: document.getElementById('dataCirurgia').value,
        procedimento: document.getElementById('procedimento').value,
        cirurgiao: document.getElementById('cirurgiao').value,
        convenio: document.getElementById('convenio').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        nomeMae: document.getElementById('nomeMae').value
      };
      
      salvarConsulta(consulta);
      alert('Consulta cadastrada com sucesso!');
      form.reset();
    });
  }
  
  function configurarPaciente() {
    // Carregar dados da secretaria
    const consultaId = new URLSearchParams(window.location.search).get('id');
    const consulta = database.consultas.find(c => c.id == consultaId);
    
    if (!consulta) {
      alert('Consulta não encontrada!');
      return;
    }
    
    // Preencher dados da secretaria
    const dadosSecretaria = document.getElementById('dadosSecretaria');
    dadosSecretaria.innerHTML = `
      <div class="form-group">
        <label>Nome do Paciente:</label>
        <p>${consulta.nome}</p>
      </div>
      <div class="form-group">
        <label>Data da Cirurgia:</label>
        <p>${new Date(consulta.dataCirurgia).toLocaleDateString()}</p>
      </div>
      <!-- Outros campos da secretaria -->
    `;
    
    // Configurar toggles (sim/não)
    document.querySelectorAll('input[type="radio"][name="alergia"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const detalhes = document.getElementById('alergiaDetalhes');
        detalhes.style.display = this.value === 'sim' ? 'block' : 'none';
      });
    });
    
    // Configurar envio do formulário
    const form = document.getElementById('formPaciente');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const paciente = {
        consultaId: consultaId,
        peso: document.getElementById('peso').value,
        altura: document.getElementById('altura').value,
        alergia: document.querySelector('input[name="alergia"]:checked').value,
        alergiaDesc: document.getElementById('alergiaDesc').value
        // Adicionar outros campos
      };
      
      salvarPaciente(paciente);
      alert('Formulário enviado com sucesso!');
      window.location.href = 'anestesista.html?id=' + consultaId;
    });
  }
  
  // Funções similares para anestesista.html e avaliacao.html