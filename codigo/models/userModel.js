var pool = require("./connection");

module.exports.getId = async function(user, userType) {
    try {       
        let sql ="";
        if(userType == "Cliente"){
            sql = "SELECT clienteID from Cliente WHERE username = ?";
        }else{
            sql = "SELECT handlerID from Handler WHERE username = ?";     
        }    
        let id = await pool.query(sql, user);
        return {status: 200, data : id};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }

}
module.exports.getUserInfo = async function(id, userType) {
        try {
            let sql ="";
            if(userType == "Cliente"){
                sql =  "SELECT email, nome, telemovel from Cliente WHERE clienteID = ?";
            }else{
                sql = "SELECT email, nome, telemovel from Handler WHERE handlerID = ?";  
            }  
            let userInfo = await pool.query(sql, id);
            return {status: 200, data : userInfo};
        } catch(err) {
            console.log(err);
            return {status:500, data: err};
        }

}

module.exports.getLogin = async function(username, password) {
    try{
        let sql = "SELECT tipo, userID from User WHERE username= ? AND password = ?"
        let result = await pool.query(sql, [username, password]);
        return {status:200, data: result}
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

module.exports.getPerfil = async function(userId) {
    try{
        let sql = "SELECT email, nome, telemovel, username, avaliacaoMedia from User WHERE userID = ?"
        let perfil = await pool.query(sql,userId);
        return {status:200, data: perfil}
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}