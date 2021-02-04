var userID;
var userType;

window.onload= function() {
    userID = sessionStorage.getItem("userID");
    userType = sessionStorage.getItem("userType");
    document.getElementById("handlerType").value = "";
    
    reverseGeocoding();
}

function reverseGeocoding() {
    getAddress();
}

async function criarPedido() {
    let elemMain = document.getElementById("criarPedido");
    let pedido = {
        date: document.getElementById("date").value+" "+document.getElementById("time").value,
        morada: document.getElementById("morada").value,  
        descricao: document.getElementById("description").value,
        cliente_id: userID,
        categoria: document.getElementById("handlerType").value
    };
    try {
        
        let result = await $.ajax({
            url: "/api/pedidos/",
            method: "POST",
            dataType: "json",
            data: JSON.stringify(pedido),
            contentType: "application/json"
        });

        alert (JSON.stringify(result)); // nova pagina ou mensagem criado e apaga fields
    }
        catch(err) {
        console.log(err);
    }
}

async function logout(){
    await sessionStorage.removeItem("userID");
    await sessionStorage.removeItem("userType");
    window.location = "index.html";
 }

// function resetAll() {

//     document.getElementById("").reset();
//     document.getElementById("").value = "";
// }
