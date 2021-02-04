var handlerID;

window.onload= function() {
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
        "<p><input type='button' class='trajetoria' id='trajetoria' onclick='calcularRotas()' value='Criar Trajetória'>"+
        "</section>";

        loadMarker(pedido.morada, pedido.id, pedido.morada);
        elemMain.innerHTML = html;
        document.getElementById("trajetoria").onclick = calcularRotas(pedido.morada);
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
    window.location = "index.html";
}
