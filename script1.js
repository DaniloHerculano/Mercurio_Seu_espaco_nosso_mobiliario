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

    if (valormesas >= 0 && valorcadeiras >= 0 && valorbancos >= 0){
        resmesas.innerHTML = finalmesas
        rescadeiras.innerHTML = finalcadeiras
        resbancos.innerHTML = finalbancos
        totalpedido.innerHTML = respedido
    }
    else {
        resmesas.innerHTML = `Os valores devem ser maiores que zero`
        rescadeiras.innerHTML = `Os valores devem ser maiores que zero`
        resbancos.innerHTML = `Os valores devem ser maiores que zero`
    }
}

const imgconforto = '<img src="images/page3_img1.jpg" width="150px"><img src="images/page3_img2.jpg" width="150px"><img src="images/page3_img3.jpg" width="150px">'
const imgmedio = '<img src="images/page3_img4.jpg" width="150px"><img src="images/page3_img5.jpg" width="150px"><img src="images/page3_img6.jpg" width="150px">'
const imgexecutivo = '<img src="images/page3_img7.jpg" width="150px"><img src="images/page3_img8.jpg" width="150px"><img src="images/page3_img9.jpg" width="150px">'

function change1() {
    change.innerHTML = imgconforto
  }
  function change2() {
    change.innerHTML = imgmedio
  }
  function change3() {
    change.innerHTML = imgexecutivo
  }