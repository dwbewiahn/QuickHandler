var userID;
var userType;

window.onload = function() {
    userID = sessionStorage.getItem("userID");
    userType = sessionStorage.getItem("userType");

    if(userType == "Cliente"){
        loadNavCliente();  
            
    }
    else {
        loadNavHandler();
        loadpedidos();
    }
    
    
}



async function loadpedidos() {
    let elemMain = document.getElementById("requestList");
    try {
        let pedidos = await $.ajax({
            url: "/api/pedidos/pendentes",
            method: "get",
            dataType: "json"
        });
        let html ="";

        for (let pedido of pedidos) {
            html += "<section class='pedidoCriado' OnCLick='pedidoOpen("+pedido.id+")'><p><b>Data:</b> "+pedido.date+"</p>"+
            "<p><b>Estado:</b>"+pedido.estado+"</p>" +
            "<p><b>Morada:</b> "+pedido.morada+"</p>"+
            "<p><b>Descricao:</b>"+pedido.descricao+"</p></section>";
            loadMarker(pedido.morada, pedido.id, pedido.username);
        }
        elemMain.innerHTML = html;

    } catch(err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
} 

function pedidoOpen(pedidoID) {
    sessionStorage.setItem("id",pedidoID); 
    window.location="../pedido.html";
}

function loadNavCliente() {
    document.getElementById("navBar").innerHTML = "<img src='/images/QHLogoBlackFull.png' id='logo' alt='QuickHandler logo'></img><a href='criarPedido.html'>Criar Pedido</a><a href='visualizarPedidos.html'>Visualizar pedidos </a><a id='sairbt' href='#' class='buttonBlue' onclick='logout()'>Sair</a>";

}

function  loadNavHandler(){
   
   document.getElementById("navBar").innerHTML = "<img src='/images/QHLogoBlackFull.png' id='logo' alt='QuickHandler logo'></img><a href='visualizarPedidos.html'>Visualizar pedidos </a><a id='sairbt' href='#' class='buttonBlue' onclick='logout()'>Sair</a>";

}

async function logout(){
    await sessionStorage.removeItem("userID");
    await sessionStorage.removeItem("userType");
    window.location = "index.html";
 }