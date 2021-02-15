async function login() {
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    /* let userType = document.getElementById("userType").value; */

    if (user.length == 0) {
        document.getElementById("errorUser").innerHTML = "Utilizador nao pode estar em Branco";
        return;
    }

    try{
        let loginInfo = await $.ajax({
            url: "/api/user/login/"+ user + "/" + password,
            method: "get",
            dataType: "json"
        });

        if(loginInfo[0] != null) {
            userID = loginInfo[0].userID;
            userType = loginInfo[0].tipo;

            sessionStorage.setItem("userID", userID);
            sessionStorage.setItem("userType", userType);

            if (userType == "Cliente") {
                window.location = "criarPedido.html";
            } else {
                window.location = "visualizarPedidos.html";
            }
        }
        else {
            document.getElementById("errorUser").innerHTML = "Utilizador Nao Existe/Invalido";
            return;
        }
    } catch {
        console.log(err);
    }

 /*    try {
        let userID = await $.ajax({
            url: "/api/user/login/" + userType + "/" + user,
            method: "get",
            dataType: "json"
        });

        
        if (userID[0] != null) {
            if (userType == "Cliente") {
                userID = userID[0].clienteID;
            } else {
                userID = userID[0].handlerID;
            }

            sessionStorage.setItem("userID", userID);
            sessionStorage.setItem("userType", userType);
            if (userType == "Cliente") {
                window.location = "criarPedido.html";
            } else {
                window.location = "visualizarPedidos.html";
            }
        }
        else {
            document.getElementById("errorUser").innerHTML = "Utilizador Nao Existe/Invalido";
            return;
        }
    }
    catch (err) {
        console.log(err);
    }

 */


}