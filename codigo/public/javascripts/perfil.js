var userID;
var userType;

window.onload = async function() {
    userID = sessionStorage.getItem("userID");
    userType = sessionStorage.getItem("userType");
    document.getElementById("perfilHead").innerHTML = "Perfil do "+ userType;

    await getPerfil();
}

async function getPerfil(){
    try {
        let userInfo = await $.ajax({
           url: "/api/user/info/"+ userID,
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

async function logout(){
    await sessionStorage.removeItem("userID");
    await sessionStorage.removeItem("userType");
    window.location = "index.html";
 }