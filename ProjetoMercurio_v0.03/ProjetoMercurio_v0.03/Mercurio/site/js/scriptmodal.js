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

function fim(){

  let data = document.getElementById('datepicker').value

  let endereco = document.getElementById('endereco').value

  let quantidademesas =  document.getElementById('quantidademesas')
  let quantidadecadeiras =  document.getElementById('quantidadecadeiras')
  let quantidadebancos =  document.getElementById('quantidadebancos')

  let valormesas = Number (quantidademesas.value)
  let valorcadeiras = Number (quantidadecadeiras.value)
  let valorbancos = Number (quantidadebancos.value)

  let totalpedido = document.getElementById("totalpedido").textContent
  let total = parseInt(totalpedido)

  let cep = document.getElementById('changecep').textContent
  let valorcep = parseInt(cep)

  let totalgeral = valorcep + total


  let titulo = document.getElementById('titulo')
  let corpo = document.getElementById('corpo')
  titulo.innerHTML = `<h5>Resumo do Pedido:</h5>`
  corpo.innerHTML = 
  `<p>Data de Entrega: <b>${data}</b>
  <p>Endereço entrega: <b>${endereco}</b>
  <p>Quantidade de bancos: <b>${valorbancos}</b>
  <p>Quantidade de cadeiras: <b>${valorcadeiras}</b>
  <p>Quantidade de mesas: <b>${valormesas}</b>
  <p>Valor produtos: <b>${total},00</b>
  <p>Valor frete: <b>${valorcep},00</b>
  <p>TOTAL A PAGAR: <b>${totalgeral},00</b>
  <p>
  <button class="btn2" onclick="pix()">Confirmar</button> <button class="btn2" onclick="toggleModal()">Cancelar</button>`
  
}
function pix(){
  let titulo = document.getElementById('titulo')
  let corpo = document.getElementById('corpo')
  titulo.innerHTML = `<h5>Pagamento PIX:</h5>`
  corpo.innerHTML = `<img src="images/qrcode/frame.png" width="200px"><p><p><button class="btn2" onclick="toggleModal()">Fechar</button>`
  
}
