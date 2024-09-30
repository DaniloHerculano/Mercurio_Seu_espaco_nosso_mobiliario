const imgconforto = '<img src="images/img-encomendar/0101.jpg" width="150px"><img src="images/img-encomendar/0102.jpg" width="150px"><img src="images/img-encomendar/0103.jpg" width="150px">'
const imgmedio =  '<img src="images/img-encomendar/0201.jpg" width="150px"><img src="images/img-encomendar/0202.jpg" width="150px"><img src="images/img-encomendar/0203.jpg" width="150px">'
const imgexecutivo = '<img src="images/img-encomendar/0301.jpg" width="150px"><img src="images/img-encomendar/0302.jpg" width="150px"><img src="images/img-encomendar/0303.jpg" width="150px">'

let escolha = 0
function change1() {
    change.innerHTML = imgconforto
    escolha = 1
  }
  function change2() {
    change.innerHTML = imgmedio
    escolha = 2
  }
  function change3() {
    change.innerHTML = imgexecutivo
    escolha = 3
  }

function valor() {
    let quantidademesas =  document.getElementById('quantidademesas')
    let quantidadecadeiras =  document.getElementById('quantidadecadeiras')
    let quantidadebancos =  document.getElementById('quantidadebancos')

    let valormesas = Number (quantidademesas.value)
    let valorcadeiras = Number (quantidadecadeiras.value)
    let valorbancos = Number (quantidadebancos.value)

    finalmesas = valormesas * 8
    finalcadeiras = valorcadeiras * 4
    finalbancos = valorbancos *3
    respedido = finalbancos + finalcadeiras + finalmesas

    finalmesas1 = valormesas * 9
    finalcadeiras1 = valorcadeiras * 5
    finalbancos1 = valorbancos *4
    respedido1 = finalbancos1 + finalcadeiras1 + finalmesas1

    finalmesas2 = valormesas * 10
    finalcadeiras2 = valorcadeiras * 6
    finalbancos2 = valorbancos *5
    respedido2 = finalbancos2 + finalcadeiras2 + finalmesas2


  if (escolha == 1){
      resmesas.innerHTML = finalmesas
      rescadeiras.innerHTML = finalcadeiras
      resbancos.innerHTML = finalbancos
      totalpedido.innerHTML = respedido
  }
  else if (escolha == 2){
    resmesas.innerHTML = finalmesas1
    rescadeiras.innerHTML = finalcadeiras1
    resbancos.innerHTML = finalbancos1
    totalpedido.innerHTML = respedido1

  } else if (escolha == 3){
    resmesas.innerHTML = finalmesas2
      rescadeiras.innerHTML = finalcadeiras2
      resbancos.innerHTML = finalbancos2
      totalpedido.innerHTML = respedido2

  } 
  else {
      resmesas.innerHTML = `Selecione um produto`
      rescadeiras.innerHTML = `Selecione um produto`
      resbancos.innerHTML = `Selecione um produto`
  }
}

function frete() {

let cep =  document.getElementById('cep')
let numerocep = Number (cep.value)

let changecep = document.getElementById('changecep')

if (numerocep >= 13290000 && numerocep <= 13294728 || numerocep >= 13280000 && numerocep <= 13289756){
 changecep.innerHTML = `0`
} else {
  changecep.innerHTML = `50`  
  let respedido1 = respedido1 + 50
  let respedido2 = respedido2 + 50
  let respedido = respedido + 50
}
}
