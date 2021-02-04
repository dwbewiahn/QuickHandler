var userID;
var userType;
var pedidoID;

window.onload = function () {
    userID = sessionStorage.getItem("userID");
    userType = sessionStorage.getItem("userType");
    pedidoID = sessionStorage.getItem("id");
   
    
    if (userType == "Cliente") {
        loadNavCliente();
        verPedidoCliente(pedidoID);
    }
    else {
        loadNavHandler();
        verPedidoHandler(pedidoID);
    }

}

async function aceitarPedido() {
    try {

        let aPedido = {
            handler_id: userID,
            pedidoID: pedidoID,
            estado: "atribuido"
        };
        
        let result = await $.ajax({
            url: "/api/pedidos/atribuir/",
            method: "POST",
            dataType: "json",
            data: JSON.stringify(aPedido),
            contentType: "application/json"
        });

    }
        catch(err) {
        console.log(err);
    } 
    
}

async function verPedidoHandler(pedidoID) {
    let elemMain = document.getElementById("verPedido");
    try {
        let pedido = await $.ajax({
            url: "/api/pedidos/" + pedidoID,
            method: "get",
            dataType: "json"
        });
        let html = "";

        html += "<p><b>Data : </b> " + pedido.date + "</p>" +
            "<p><b>Cliente : </b>" + pedido.username + "</p>" +
            "<p><b>Estado : </b>" + pedido.estado + "</p>" +
            "<p><b>Morada : </b> " + pedido.morada + "</p>" +
            "<p><b>Descricao : </b>" + pedido.descricao + "</p>" +
            "<a href='visualizarPedidos.html' type='button' class='buttonWhite' onclick='aceitarPedido(" + pedido.id + ")' >Aceitar</a>"+
            "<a href='visualizarPedidos.html' type='button' class='buttonBlue'>Voltar</a></section>";


        loadMarker(pedido.morada, pedido.id, pedido.morada);
        elemMain.innerHTML = html;
      
    }
    catch (err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
}

async function verPedidoCliente(pedidoID) {
    let elemMain = document.getElementById("verPedido");
    try {
        let pedido = await $.ajax({
            url: "/api/pedidos/" + pedidoID,
            method: "get",
            dataType: "json"
        });
        let html = "";

        html += "<p><b>Data : </b> " + pedido.date + "</p>" +
            "<p><b>Cliente : </b>" + pedido.username + "</p>" +
            "<p><b>Estado : </b>" + pedido.estado + "</p>" +
            "<p><b>Morada : </b> " + pedido.morada + "</p>" +
            "<p><b>Descricao : </b>" + pedido.descricao + "</p>"

            

        loadMarker(pedido.morada, pedido.id, pedido.morada);
        elemMain.innerHTML = html;
  
    }
    catch (err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>" +
            "<h2> Por favor tente mais tarde</h2>";
    }
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
