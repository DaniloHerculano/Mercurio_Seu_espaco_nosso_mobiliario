const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});

function fim() {
  const dataInicio = document.getElementById('datepicker-start').value;
  const dataRetorno = document.getElementById('datepicker-end').value;
  const endereco = document.getElementById('endereco').value;

  const valormesas = Number(document.getElementById('quantidademesas').value);
  const valorcadeiras = Number(document.getElementById('quantidadecadeiras').value);
  const valorbancos = Number(document.getElementById('quantidadebancos').value);

  const totalDiario = parseInt(document.getElementById("totaldiaria").textContent) || 0;
  const valorcep = parseInt(document.getElementById('changecep').textContent) || 0;

  const inicio = new Date(dataInicio.split('/').reverse().join('-'));
  const retorno = new Date(dataRetorno.split('/').reverse().join('-'));
  const dias = Math.round((retorno - inicio) / (1000 * 60 * 60 * 24));

  if (dias <= 0) {
    alert("A data de retorno deve ser posterior à data de início.");
    return;
  }

  const totalpedido_nfrete = totalDiario * dias;
  const totalgeral = totalpedido_nfrete + valorcep;

  const titulo = document.getElementById('titulo');
  const corpo = document.getElementById('corpo');
  
  titulo.innerHTML = `<h5>Resumo do Pedido:</h5>`;
  corpo.innerHTML = `
    <p>Data de Início: <b>${dataInicio}</b></p>
    <p>Data de Retorno: <b>${dataRetorno}</b></p>
    <p>Quantidade de Dias: <b>${dias}</b></p>
    <p>Endereço de Entrega: <b>${endereco}</b></p>
    <p>Quantidade de Bancos: <b>${valorbancos}</b></p>
    <p>Quantidade de Cadeiras: <b>${valorcadeiras}</b></p>
    <p>Quantidade de Mesas: <b>${valormesas}</b></p>
    <p>Valor Diário dos Produtos: <b>R$ ${totalDiario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</b></p>
    <p>Valor Total dos Produtos (sem frete): <b>R$ ${totalpedido_nfrete.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</b></p>
    <p>Valor do Frete: <b>R$ ${valorcep.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</b></p>
    <p><strong>TOTAL A PAGAR: R$ ${totalgeral.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong></p>
    <button class="btn2" onclick="finalizarPedido()">Confirmar</button>
    <button class="btn2" onclick="toggleModal()">Cancelar</button>`;
}

function pix(dataInicio, dataRetorno, endereco, mesas, cadeiras, bancos, totalDiario, totalSemFrete, frete, total) {
  const pedido = {
    dataInicio,
    dataRetorno,
    endereco,
    mesas,
    cadeiras,
    bancos,
    totalDiario,
    totalSemFrete,
    frete,
    total
  };
  
  // Atualiza o estoque subtraindo as quantidades do pedido
  const estoque = JSON.parse(localStorage.getItem('estoque')) || { mesas: 500, cadeiras: 500, bancos: 500 };
  estoque.mesas -= mesas;
  estoque.cadeiras -= cadeiras;
  estoque.bancos -= bancos;
  
  // Verifica se há estoque suficiente antes de confirmar o pedido
  if (estoque.mesas < 0 || estoque.cadeiras < 0 || estoque.bancos < 0) {
    alert("Estoque insuficiente para concluir o pedido.");
    return;
  }
  
  // Salva o estoque atualizado no LocalStorage
  localStorage.setItem('estoque', JSON.stringify(estoque));

  // Salva o pedido no histórico
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  const titulo = document.getElementById('titulo');
  const corpo = document.getElementById('corpo');
  
  titulo.innerHTML = `<h5>Pagamento PIX:</h5>`;
  corpo.innerHTML = `
    <img src="images/qrcode/frame.png" width="200px">
    <p><p>
    <button class="btn2" onclick="fecharModalERedirecionar()">Fechar</button>`;
}
