var userID;

window.onload = function() {
    userID = sessionStorage.getItem("userID");
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

async function logout(){
    await sessionStorage.removeItem("userID");
    window.location = "index.html";
 }