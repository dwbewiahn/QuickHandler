var userID;
var userType;

window.onload = async function() {
    userID = sessionStorage.getItem("userID");
    userType = sessionStorage.getItem("userType");

    if (userType == "Cliente") {
        loadNavCliente();      
    }
    else {
        loadNavHandler()    
    }

    document.getElementById("perfilHead").innerHTML = "Perfil do "+ userType;
    await getPerfil();

   
}

async function getPerfil(){
    try {
           let userInfo = await $.ajax({
            url: "/api/user/perfil/"+ userID,
            method: "get",
            dataType: "json"
        });
      
        userInfo = userInfo[0];
        document.getElementById("nome").innerHTML = userInfo.nome;
        document.getElementById("email").innerHTML = userInfo.email;
        document.getElementById("telemovel").innerHTML = userInfo.telemovel;   
    }
        catch(err) {
        console.log(err);
    }
}

function loadNavCliente() {
    document.getElementById("navBar").innerHTML = "<img src='/images/QHLogoBlackFull.png' id='logo' alt='QuickHandler logo'></img><a href='criarPedido.html'>Criar Pedido</a><a href='visualizarPedidos.html'>Visualizar pedidos </a><a href='perfil.html'>Visualizar Perfil</a><a id='sairbt' href='#' class='buttonBlue' onclick='logout()'>Sair</a>";

}

function loadNavHandler() {

    document.getElementById("navBar").innerHTML = "<img src='/images/QHLogoBlackFull.png' id='logo' alt='QuickHandler logo'></img><a href='visualizarPedidos.html'>Visualizar pedidos </a><a href='perfil.html'>Visualizar Perfil</a><a id='sairbt' href='#' class='buttonBlue' onclick='logout()'>Sair</a>";

}


async function logout(){
    await sessionStorage.removeItem("userID");
    await sessionStorage.removeItem("userType");
    window.location = "index.html";
 }