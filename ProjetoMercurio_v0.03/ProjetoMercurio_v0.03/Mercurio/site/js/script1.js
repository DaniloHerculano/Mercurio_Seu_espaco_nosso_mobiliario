$(document).ready(function() {
    $("#datepicker-start").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
        onSelect: function(selectedDate) {
            let startDate = $("#datepicker-start").datepicker("getDate");
            startDate.setDate(startDate.getDate() + 1);
            $("#datepicker-end").datepicker("option", "minDate", startDate);
        }
    });

    $("#datepicker-end").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 1
    });
});

const imgconforto = '<img src="images/img-encomendar/0101.jpg" width="150px"><img src="images/img-encomendar/0102.jpg" width="150px"><img src="images/img-encomendar/0103.jpg" width="150px">';
const imgmedio = '<img src="images/img-encomendar/0201.jpg" width="150px"><img src="images/img-encomendar/0202.jpg" width="150px"><img src="images/img-encomendar/0203.jpg" width="150px">';
const imgexecutivo = '<img src="images/img-encomendar/0301.jpg" width="150px"><img src="images/img-encomendar/0302.jpg" width="150px"><img src="images/img-encomendar/0303.jpg" width="150px">';

let escolha = 0;
let totalFrete = 0;
let valorDiario = 0;
let totalPedido = 0;

function change1() {
    document.getElementById("change").innerHTML = imgconforto;
    escolha = 1;
}

function change2() {
    document.getElementById("change").innerHTML = imgmedio;
    escolha = 2;
}

function change3() {
    document.getElementById("change").innerHTML = imgexecutivo;
    escolha = 3;
}

function valor() {
    const valormesas = Number(document.getElementById('quantidademesas').value);
    const valorcadeiras = Number(document.getElementById('quantidadecadeiras').value);
    const valorbancos = Number(document.getElementById('quantidadebancos').value);

    let finalmesas, finalcadeiras, finalbancos;

    if (escolha === 1) {
        finalmesas = valormesas * 8;
        finalcadeiras = valorcadeiras * 4;
        finalbancos = valorbancos * 3;
    } else if (escolha === 2) {
        finalmesas = valormesas * 9;
        finalcadeiras = valorcadeiras * 5;
        finalbancos = valorbancos * 4;
    } else if (escolha === 3) {
        finalmesas = valormesas * 10;
        finalcadeiras = valorcadeiras * 6;
        finalbancos = valorbancos * 5;
    } else {
        document.getElementById("resmesas").innerHTML = "Selecione um produto";
        document.getElementById("rescadeiras").innerHTML = "Selecione um produto";
        document.getElementById("resbancos").innerHTML = "Selecione um produto";
        valorDiario = 0;
        totalPedido = 0;
        document.getElementById("totalpedido_nfrete").innerHTML = "--";
        return;
    }

    valorDiario = finalmesas + finalcadeiras + finalbancos;

    document.getElementById("resmesas").innerHTML = finalmesas.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    document.getElementById("rescadeiras").innerHTML = finalcadeiras.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    document.getElementById("resbancos").innerHTML = finalbancos.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    document.getElementById("totaldiaria").innerHTML = valorDiario.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

    const dataInicio = document.getElementById('datepicker-start').value;
    const dataRetorno = document.getElementById('datepicker-end').value;
    if (dataInicio && dataRetorno) {
        const inicio = new Date(dataInicio.split("/").reverse().join("-"));
        const retorno = new Date(dataRetorno.split("/").reverse().join("-"));
        const dias = Math.ceil((retorno - inicio) / (1000 * 60 * 60 * 24));

        if (dias > 0) {
            const totalSemFrete = valorDiario * dias;
            totalPedido = totalSemFrete;

            document.getElementById("totalpedido_nfrete").innerHTML = totalSemFrete.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
            document.getElementById("totalpedido").innerHTML = (totalSemFrete + totalFrete).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
        }
    }
}

function frete() {
    const cep = document.getElementById("cep").value;
    totalFrete = ((cep >= "13290000" && cep <= "13294728") || (cep >= "13280000" && cep <= "13289756")) ? 0 : 50;
    document.getElementById("changecep").innerHTML = totalFrete.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    document.getElementById("totalpedido").innerHTML = (totalPedido + totalFrete).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function finalizarPedido() {
    const dataInicio = document.getElementById('datepicker-start').value;
    const dataRetorno = document.getElementById('datepicker-end').value;
    const endereco = document.getElementById('endereco').value;
    const bancos = parseInt(document.getElementById('quantidadebancos').value);
    const cadeiras = parseInt(document.getElementById('quantidadecadeiras').value);
    const mesas = parseInt(document.getElementById('quantidademesas').value);

    // Validação de campos
    if (!dataInicio || !dataRetorno || !escolha || isNaN(bancos) || isNaN(cadeiras) || isNaN(mesas) || !endereco) {
        alert("Por favor, preencha todos os campos antes de finalizar o pedido.");
        return;
    }

    // Verificação das datas
    if (new Date(dataRetorno.split("/").reverse().join("-")) <= new Date(dataInicio.split("/").reverse().join("-"))) {
        alert("A data de retorno deve ser posterior à data de início.");
        return;
    }

    // Cálculo do frete
    frete();

    // Obtenção do estoque atual
    const estoqueAtual = JSON.parse(localStorage.getItem('estoque')) || { mesas: 500, cadeiras: 500, bancos: 500 };

    console.log("Estoque antes do pedido:", estoqueAtual); // Verificação do estoque antes

    // Verificação de disponibilidade no estoque
    if (mesas > estoqueAtual.mesas || cadeiras > estoqueAtual.cadeiras || bancos > estoqueAtual.bancos) {
        alert("Estoque insuficiente para o pedido.");
        return;
    }

    // Atualização do estoque com as quantidades do pedido
    estoqueAtual.mesas -= mesas;
    estoqueAtual.cadeiras -= cadeiras;
    estoqueAtual.bancos -= bancos;

    // Salva o estoque atualizado no LocalStorage
    localStorage.setItem('estoque', JSON.stringify(estoqueAtual));

    console.log("Estoque após o pedido:", estoqueAtual); // Verificação do estoque após

    // Salva o pedido no histórico
    const tipo = escolha === 1 ? "Conforto" : escolha === 2 ? "Médio" : "Executivo";
    const pedido = {
        dataInicio,
        dataRetorno,
        endereco,
        tipo,
        mesas,
        cadeiras,
        bancos,
        dias: Math.ceil((new Date(dataRetorno.split("/").reverse().join("-")) - new Date(dataInicio.split("/").reverse().join("-"))) / (1000 * 60 * 60 * 24)),
        frete: totalFrete.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
        totalDiario: valorDiario.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
        totalSemFrete: totalPedido.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
        total: (totalPedido + totalFrete).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
    };

    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    alert("Pedido finalizado com sucesso!");
    window.location.href = "customer_area.html";
}
