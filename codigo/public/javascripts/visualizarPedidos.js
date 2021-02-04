var userID;
var userType;

window.onload = function () {
    userID = sessionStorage.getItem("userID");
    userType = sessionStorage.getItem("userType");

    if (userType == "Cliente") {
        loadNavCliente();
        document.getElementById("tPedidos").innerHTML = "Meus Pedidos";
        loadMeusPedidos();
    }
    else {
        loadNavHandler();
        loadButtonsHandler();
    }
}

function loadButtonsHandler(){

    document.getElementById("tPedidos").innerHTML = "Visualizar Pedidos";
    document.getElementById("requestList").innerHTML = "<a href='#' id='PedPenHend' class='buttonBlueHandler' onclick='loadpedidos()'> Pedidos Pendentes de Handler</a><a href='#' class='buttonBlueHandler' onclick='loadMeusPedidos()'> Meus Pedidos Atribuidos</a>";

}

async function loadMeusPedidos() {
    let elemMain = document.getElementById("requestList");
    try {
        let pedidos = await $.ajax({
            url: "/api/pedidos/meusPedidos/"+userID + "/" + userType,
            method: "get",
            dataType: "json"
        });
        let html = "";

        for (let pedido of pedidos) {
            html += "<section class='pedidoCriado' OnCLick='pedidoOpen(" + pedido.id + ")'><p><b>Data:</b> " + pedido.date + "</p>" +
                "<p><b>Estado:</b>" + pedido.estado + "</p>" +
                "<p><b>Morada:</b> " + pedido.morada + "</p>" +
                "<p><b>Descricao:</b>" + pedido.descricao + "</p></section>";
            loadMarker(pedido.morada, pedido.id, pedido.username);
        }
        elemMain.innerHTML = html;

    } catch (err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}


async function loadpedidos() {
    let elemMain = document.getElementById("requestList");
    try {
        let pedidos = await $.ajax({
            url: "/api/pedidos",
            method: "get",
            dataType: "json"
        });
        let html = "";

        for (let pedido of pedidos) {
            html += "<section class='pedidoCriado' OnCLick='pedidoOpen(" + pedido.id + ")'><p><b>Data:</b> " + pedido.date + "</p>" +
                "<p><b>Estado:</b>" + pedido.estado + "</p>" +
                "<p><b>Morada:</b> " + pedido.morada + "</p>" +
                "<p><b>Descricao:</b>" + pedido.descricao + "</p></section>";
            loadMarker(pedido.morada, pedido.id, pedido.username);
        }
        elemMain.innerHTML = html;

    } catch (err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

function pedidoOpen(pedidoID) {
    sessionStorage.setItem("id", pedidoID);
    window.location = "../pedido.html";
}

function loadNavCliente() {
    document.getElementById("navBar").innerHTML = "<img src='/images/QHLogoBlackFull.png' id='logo' alt='QuickHandler logo'></img><a href='criarPedido.html'>Criar Pedido</a><a href='visualizarPedidos.html'>Visualizar pedidos </a><a href='perfil.html'>Visualizar Perfil</a><a id='sairbt' href='#' class='buttonBlue' onclick='logout()'>Sair</a>";

}

function loadNavHandler() {

    document.getElementById("navBar").innerHTML = "<img src='/images/QHLogoBlackFull.png' id='logo' alt='QuickHandler logo'></img><a href='visualizarPedidos.html'>Visualizar pedidos </a><a href='perfil.html'>Visualizar Perfil</a><a id='sairbt' href='#' class='buttonBlue' onclick='logout()'>Sair</a>";

}

async function logout() {
    await sessionStorage.removeItem("userID");
    await sessionStorage.removeItem("userType");
    window.location = "index.html";
}