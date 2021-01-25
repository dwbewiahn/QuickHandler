
window.onload= function() {
    let pedidoID = sessionStorage.getItem("id");
    verPedido(pedidoID);
}

async function verPedido(pedidoID) {
    try {
        let pedido = await $.ajax({
            url: "/api/pedidos/"+ pedidoID,
            method: "get",
            dataType: "json"
        });
        alert(JSON.stringify(pedido));
    }
        catch(err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
}