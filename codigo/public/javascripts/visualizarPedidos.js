window.onload = function() {
    loadpedidos();
}

async function loadpedidos() {
    let elemMain = document.getElementById("requestList");
    try {
        let pedidos = await $.ajax({
            url: "/api/pedidos",
            method: "get",
            dataType: "json"
        });
        let html ="";
        let i=0;
        var markers = [];
        for (let pedido of pedidos) {
            html += "<div></div><section OnCLick='pedidoOpen("+pedido.id+")'><p><b>Data:</b> "+pedido.date+"</p>"+
            "<p><b>Estado:</b>"+pedido.estado+"</p>" +
            "<p><b>Morada:</b> "+pedido.morada+"</p>"+
            "<p><b>Descricao:</b>"+pedido.descricao+"</p></section>";
            //loadMarker(pedido.morada);
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