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
  const data = document.getElementById('datepicker').value;
  const endereco = document.getElementById('endereco').value;

  const valormesas = Number(document.getElementById('quantidademesas').value);
  const valorcadeiras = Number(document.getElementById('quantidadecadeiras').value);
  const valorbancos = Number(document.getElementById('quantidadebancos').value);

  const totalpedido = parseInt(document.getElementById("totalpedido").textContent);
  const valorcep = parseInt(document.getElementById('changecep').textContent);
  const totalgeral = valorcep + totalpedido;

  const titulo = document.getElementById('titulo');
  const corpo = document.getElementById('corpo');
  
  titulo.innerHTML = `<h5>Resumo do Pedido:</h5>`;
  corpo.innerHTML = `
    <p>Data de Entrega: <b>${data}</b></p>
    <p>Endereço entrega: <b>${endereco}</b></p>
    <p>Quantidade de bancos: <b>${valorbancos}</b></p>
    <p>Quantidade de cadeiras: <b>${valorcadeiras}</b></p>
    <p>Quantidade de mesas: <b>${valormesas}</b></p>
    <p>Valor produtos: <b>${totalpedido},00</b></p>
    <p>Valor frete: <b>${valorcep},00</b></p>
    <p>TOTAL A PAGAR: <b>${totalgeral},00</b></p>
    <button class="btn2" onclick="pix(${data}, '${endereco}', ${valormesas}, ${valorcadeiras}, ${valorbancos}, ${totalgeral})">Confirmar</button>
    <button class="btn2" onclick="toggleModal()">Cancelar</button>`;
}

function pix(data, endereco, mesas, cadeiras, bancos, total) {
  const pedido = {
    data,
    endereco,
    mesas,
    cadeiras,
    bancos,
    total
  };
  
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

function fecharModalERedirecionar() {
  toggleModal(); // Fecha o modal
  window.location.href = "customer_area.html"; // Redireciona para a área do cliente
}
