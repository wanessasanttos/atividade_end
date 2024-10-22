// Função para criar agendamento, recebe os quatro parametros necessários e retorna um registro com o agendamento definido
const novoAgendamento = (nome, sala, horario, data) => {
    return {nome, sala, horario, data}
}
//console.log(criarAgendamento('Gustavo', 'Auditório', 1000, 21102024))




// Essa função vai salvar o agendamento feito na memória do navegador, permitindo que mesmo que ele seja fechado, os agendamentos fiquem salvos
const salvarAgendamentos = (agendamentos) => {
    // localStorage.setItem permite guarda dados no local storage, permitido o carregamento dos dados após o fechamento da aba
    // 'agendamento' (primeiro parametro) identifica os dados que serão guardados 
    //  JSON.stringify converte em uma notação que permite o armazenamento e a utilização desses dados em diferentes formatos e que permite a tranferencia entre diferentes sistemas computacionais
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
}




// Função para recuperar os agendamentos feitos e guardados na chave 'agendamentos'  
const recuperarAgendamentos = () => {
    return JSON.parse(localStorage.getItem('agendamentos')) || []
}  


// Essa função carrega e exibe os agendamentos feitos anteriormente na tela
const carregarAgendamentosSalvos = () => {
    // agendamentosSalvos aplica a função recuperarAgendamentos que busca os agendamentos no armazenamento do navegador 
    const agendamentosSalvos = recuperarAgendamentos()
    // essa função forEach funciona como uma especie de map, porém, sem criar uma nova lista, apenas aplicando a função passada como parametro a cada elemnento da lista 
    agendamentosSalvos.forEach(adicionarAgendamentoNaTabela)
}


// Essa função tem como fim adicinar um novo agendamento à lista de agendamentos feitos
// Recebe os parametros normais da função
const adicionarAgendamento = (nome, sala, horario, data) => {
    // Aplica a função novoAgendamento aos parametros passados, e guarda isso em agendamento
    const agendamento = novoAgendamento(nome, sala, horario, data)
    // Cria uma nova lista atualizada com os agendamentos feitos anteriormente e com o novo agendamento e salva em listaAtualizadaDeAgendamentos
    const listaAtualizadaDeAgendamentos = [...recuperarAgendamentos(), agendamento]

    // Aplica a função salvarAgendamentos à listaAtualizadaDeAgendamentos
    salvarAgendamentos(listaAtualizadaDeAgendamentos)
    // Aplica a função adicionarAgendamentoNaTabela ao agendamento
    adicionarAgendamentoNaTabela(agendamento)
}   





const adicionarAgendamentoNaTabela = (agendamento) => {
   
    // Cria uma nova linha no html 'tr'
    const novaLinha = document.createElement('tr')


    // Cria uma celula no html 'td' e adiciona nela o valor agendamento.data na celula elemData que sera adicionada na nova linha da tabela
    const celulaData = document.createElement('td')
    // elemData.textContent ira definir o conteudo do elemData
    celulaData.textContent = agendamento.data
    //nova linha faz referencia ao 'tr', criado anteriormente = const novaLinha = document.createElement('tr')
    // o appendChild(elemData) vai unir, 'dar um nó' no elemento data à linha criada, tornando-a uma 'filha' da linha, um elemento da linha
    novaLinha.appendChild(celulaData)

    // A logica de criação do elemento para todos os elementos a partir daqui se repete 
    const celulaSala = document.createElement('td')
    celulaSala.textContent = agendamento.sala
    novaLinha.appendChild(celulaSala)

    const celulaHorario = document.createElement('td')
    celulaHorario.textContent = agendamento.horario
    novaLinha.appendChild(celulaHorario)

    const celulaNome = document.createElement('td')
    celulaNome.textContent = agendamento.nome
    novaLinha.appendChild(celulaNome)

    document.getElementById('tabela-agendamentos').appendChild(novaLinha)
}


// Função que verifica se o agendamento solicitado é conflitante com algum agendamento já feito
const verificarAgendamento = (nome, sala, horario, data, agendamentos) => {
    // A função .some verifica se pelo menos 1 das comparação é verdadeira
    return agendamentos.some(agendamento =>
        agendamento.data == data && agendamento.sala == sala && agendamento.horario == horario)
}
// Essa função pega o valor do formularioDeAgendamento, adiciona uma ouvinte de evento que significa que sempre que um evento for detectado, (o evento é definido como primeiro parametro) a função definida no segundo parametro é execultada. 
// O preventDefault serve para bloquear o envio dos dados e o carregamento da página, permitindo que os dados possam ser editados antes do envio. O envio só sera feito a partir do click no botão com o id submit
document.getElementById('agendamento-form').addEventListener('submit', (event) => {
   event.preventDefault() 

    // Define os elementos baseados no id buscando os valores no document 
    const nome = document.getElementById('nome').value
    const sala = document.getElementById('sala').value
    const horario = document.getElementById('horario').value
    const data = document.getElementById('data').value


    // Verifica se algum dos elementos não foi selecionado
    if (!nome || !sala || !horario || !data) {
        // Cria uma janela de alerta no navegador
        alert('Por favor, preencha todos os campos!')
        return
    }


    //Define os agendamentos salvos no navegador atraves da aplicação da função recuperarAgendamento
    const agendamentosSalvos = recuperarAgendamentos()


    // verifica se o agendamento solicitado coincide com algum ja feito
    if (verificarAgendamento(nome, sala, horario, data, agendamentosSalvos)){
        alert('Esse horário já está reservado para a sala selecionada!')
        return
    }    
    
    // Caso o agendamento não tenha sido feito anteriomente, o agendamento será salvo. 
    adicionarAgendamento(nome, sala, horario, data)

    // da um reset nos parametros selecionados no formulário do html
    document.getElementById('agendamento-form').reset()
})
// Essa função adiciona um ouvinte de evento que vai ser acionado quando o evento load for percebido
// O evento load acontece quando todos os parametros do formularios forem preenchidos, quando isso for feito, a função carregarAgendamentosSalvos vai ser chamada
window.addEventListener('load', carregarAgendamentosSalvos)
