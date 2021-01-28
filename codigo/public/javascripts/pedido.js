
window.onload= function() {
    let pedidoID = sessionStorage.getItem("id");
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
        alert(JSON.stringify(pedido));

        html += "<p><b>Data:</b> "+ pedido.date +"</p>"+
        "<p><b>Cliente:</b>"+ pedido.username +"</p>" +
        "<p><b>Estado:</b>"+ pedido.estado +"</p>" +
        "<p><b>Morada:</b> "+ pedido.morada +"</p>"+
        "<p><b>Descricao:</b>"+ pedido.descricao +"</p></section>";
        loadMarker(pedido.morada);
        elemMain.innerHTML = html;
    }
        catch(err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
}