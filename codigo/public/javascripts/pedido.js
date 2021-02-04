var handlerID;
var userType;

window.onload= function() {
    userID = sessionStorage.getItem("userID");
    userType = sessionStorage.getItem("userType");
    let pedidoID = sessionStorage.getItem("id");
    handlerID= "3"
    verPedido(pedidoID);
}

async function verPedido(pedidoID) {
    let elemMain = document.getElementById("verPedido");
    try {
        let pedido = await $.ajax({
            url: "/api/pedidos/"+ pedidoID,
            method: "get",
            dataType: "json"
        });

        let html = "";

        html += "<p><b>Data:</b> "+ pedido.date +"</p>"+
        "<p><b>Cliente:</b>"+ pedido.username +"</p>" +
        "<p><b>Estado:</b>"+ pedido.estado +"</p>" +
        "<p><b>Morada:</b> "+ pedido.morada +"</p>"+
        "<p><b>Descricao:</b>"+ pedido.descricao +"</p>"+
        "<p><input type='button' class='aceitar' onclick='aceitarPedido("+ pedido.id +")' value='Aceitar Pedido'>"+
        "</section>";
        loadMarker(pedido.morada, pedido.id, pedido.morada);
        elemMain.innerHTML = html;
    }
        catch(err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
}

function aceitarPedido(pedidoID) {
    //add handlerId to pedido in DB
}

async function logout(){
    await sessionStorage.removeItem("userID");
    await sessionStorage.removeItem("userType");
    window.location = "index.html";
 }