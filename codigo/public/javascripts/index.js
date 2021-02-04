async function login() {
    let user = document.getElementById("user").value;
    let userType = document.getElementById("userType").value;
    
    //mudar essa verificacao de entrada correta de user para model
    if (user.length == 0){
        document.getElementById("errorUser").innerHTML = "Utilizador nao pode estar em Branco";
        return;
    }   
    
    
    try {
        let userID = await $.ajax({
           url: "/api/user/"+ user +"/"+userType ,
            method: "get",
            dataType: "json"
        });
        alert(JSON.stringify(userID));
        //mudar essa verificacao de entrada correta de user para model
        if(userID[0] != null){
            sessionStorage.setItem("userID", userID[0].clienteID);
            sessionStorage.setItem("userType", userType);
            if(userType == "Cliente"){
                window.location = "criarPedido.html";
            }else {
                window.location = "visualizarPedidos.html";
            }            
        }
        else {            
            document.getElementById("errorUser").innerHTML = "Utilizador Nao Existe/Invalido";
            return; 
        }
    }
        catch(err) {
        console.log(err);
    }

    


}