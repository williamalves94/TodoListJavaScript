'use strict';

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []; // pega do bacno.
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco)); // atualiza o banco.

// Função para criar a tarefa.
const criarItem = (tarefa, status, indice) => {
  // quando essa função for criada, criara o label no documento index.
  const item = document.createElement('label'); // criando um label no documento index.
  item.classList.add('todo__item'); // adicionando o nome classe para o label acima.
  item.innerHTML = `                
    <input type="checkbox" ${status} data-indice=${indice}> 
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
  `;// adicionando o conteudo acima no HTML do documento index.

  document.getElementById('todoList').appendChild(item); // adicionando o item criado na div 'todoList' na linha 16.
}

// função para remover o ultimo filho e nao ter repetições de tarefas.
const limparTarefas = () => {
  const todoList = document.getElementById('todoList'); // pegou o elemento 'todoList' do index.
  while (todoList.firstChild){
    todoList.removeChild(todoList.lastChild) // vai sempre remover o ultimo filho pra nao haver repetição de filhos.
  }
}

// função para atualizar a tela.
const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice)); 

}

// função para inserir uma nova tarefa.
const inserirItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value; 
  if (tecla === 'Enter'){
    const banco = getBanco();
    banco.push({'tarefa': texto, 'status':''});
    setBanco(banco);
    atualizarTela();
    evento.target.value = '';
  }
}

const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice(indice, 1);
  setBanco(banco);
  atualizarTela();
}

const atualizarItem = (indice) => {
  const banco = getBanco();
  banco [indice].status = banco [indice].status === '' ? 'checked' : '';
  setBanco(banco);
  atualizarTela();
}

const clickItem = (evento) => {
  const elemento = evento.target;
  if (elemento.type === 'button'){
    const indice = elemento.dataset.indice;
    removerItem(indice);
  } else if (elemento.type === 'checkbox'){
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();


