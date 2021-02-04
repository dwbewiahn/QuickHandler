async function login() {
    let user = document.getElementById("user").value;
    if (user.length == 0){
        document.getElementById("errorUser").innerHTML = "Utilizador nao pode estar em Branco";
        return;
    }    
    try {
        let userID = await $.ajax({
           url: "/api/user/"+ user,
            method: "get",
            dataType: "json"
        });
        
        //mudar essa verificacao para model
        if(userID[0] != null){
            sessionStorage.setItem("userID", userID[0].clienteID);
            window.location = "perfil.html";
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