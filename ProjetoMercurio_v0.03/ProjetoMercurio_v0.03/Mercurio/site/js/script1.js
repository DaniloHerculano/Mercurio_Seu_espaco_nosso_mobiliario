const imgconforto = '<img src="images/img-encomendar/0101.jpg" width="150px"><img src="images/img-encomendar/0102.jpg" width="150px"><img src="images/img-encomendar/0103.jpg" width="150px">';
const imgmedio = '<img src="images/img-encomendar/0201.jpg" width="150px"><img src="images/img-encomendar/0202.jpg" width="150px"><img src="images/img-encomendar/0203.jpg" width="150px">';
const imgexecutivo = '<img src="images/img-encomendar/0301.jpg" width="150px"><img src="images/img-encomendar/0302.jpg" width="150px"><img src="images/img-encomendar/0303.jpg" width="150px">';

let escolha = 0;
let totalFrete = 0;
let totalPedido = 0;

function change1() {
    change.innerHTML = imgconforto;
    escolha = 1;
}

function change2() {
    change.innerHTML = imgmedio;
    escolha = 2;
}

function change3() {
    change.innerHTML = imgexecutivo;
    escolha = 3;
}

function valor() {
    let quantidademesas = document.getElementById('quantidademesas');
    let quantidadecadeiras = document.getElementById('quantidadecadeiras');
    let quantidadebancos = document.getElementById('quantidadebancos');

    let valormesas = Number(quantidademesas.value);
    let valorcadeiras = Number(quantidadecadeiras.value);
    let valorbancos = Number(quantidadebancos.value);

    let finalmesas, finalcadeiras, finalbancos;

    if (escolha === 1) {
        finalmesas = valormesas * 8;
        finalcadeiras = valorcadeiras * 4;
        finalbancos = valorbancos * 3;
        totalPedido = finalmesas + finalcadeiras + finalbancos;
    } else if (escolha === 2) {
        finalmesas = valormesas * 9;
        finalcadeiras = valorcadeiras * 5;
        finalbancos = valorbancos * 4;
        totalPedido = finalmesas + finalcadeiras + finalbancos;
    } else if (escolha === 3) {
        finalmesas = valormesas * 10;
        finalcadeiras = valorcadeiras * 6;
        finalbancos = valorbancos * 5;
        totalPedido = finalmesas + finalcadeiras + finalbancos;
    } else {
        resmesas.innerHTML = `Selecione um produto`;
        rescadeiras.innerHTML = `Selecione um produto`;
        resbancos.innerHTML = `Selecione um produto`;
        totalPedido = 0;
    }

    resmesas.innerHTML = finalmesas;
    rescadeiras.innerHTML = finalcadeiras;
    resbancos.innerHTML = finalbancos;
    totalpedido.innerHTML = totalPedido + totalFrete;
}

function frete() {
    let cep = document.getElementById('cep').value;
    let changecep = document.getElementById('changecep');

    if ((cep >= "13290000" && cep <= "13294728") || (cep >= "13280000" && cep <= "13289756")) {
        totalFrete = 0;
    } else {
        totalFrete = 50;
    }

    changecep.innerHTML = totalFrete;
    totalpedido.innerHTML = totalPedido + totalFrete;
}

function finalizarPedido() {
    const data = document.getElementById('datepicker').value;
    const bancos = document.getElementById('quantidadebancos').value;
    const cadeiras = document.getElementById('quantidadecadeiras').value;
    const mesas = document.getElementById('quantidademesas').value;

    if (!data || !escolha || !bancos || !cadeiras || !mesas) {
        alert("Por favor, preencha todos os campos antes de finalizar o pedido.");
        return;
    }

    const tipo = escolha === 1 ? "Conforto" : escolha === 2 ? "Médio" : "Executivo";
    const pedido = {
        data: data,
        tipo: tipo,
        bancos: bancos,
        cadeiras: cadeiras,
        mesas: mesas,
        frete: totalFrete,
        total: totalPedido + totalFrete,
    };

    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    alert("Pedido finalizado com sucesso!");
    window.location.href = "customer_area.html";
}
