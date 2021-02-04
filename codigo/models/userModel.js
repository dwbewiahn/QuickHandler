var pool = require("./connection");

module.exports.getId = async function(user) {
    try {
        let sql = "SELECT clienteID from Cliente WHERE username = ?";
        let id = await pool.query(sql, user);
        return {status: 200, data : id};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }

}

module.exports.getUserInfo = async function(id) {
        try {
            let sql = "SELECT email, nome, telemovel from Cliente WHERE clienteID = ?";
            let userInfo = await pool.query(sql, id);
            return {status: 200, data : userInfo};
        } catch(err) {
            console.log(err);
            return {status:500, data: err};
        }

}