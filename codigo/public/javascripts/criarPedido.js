var userID;

window.onload= function() {
    userID = sessionStorage.getItem("user_id");
    criarPedido();
}

async function criarPedido() {
    let elemMain = document.getElementById("criarPedido");
    let pedido = {
        date: "2021-03-21T15:30:00.000Z",
        morada: document.getElementById("morada").value,  
        descricao: document.getElementById("description").value,
        cliente_id: userID
    };
    try {
        let result = await $.ajax({
            url: "/api/pedidos/",
            method: "POST",
            dataType: "json",
            data: JSON.stringify(pedido),
            contentType: "application/json"
        });
    }
        catch(err) {
        console.log(err);
    }
}