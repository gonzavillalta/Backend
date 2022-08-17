var pool = require('./bd');
var md5 = require('md5');

async function getUserByUsernameAndPassword(usuario, password) { // cambie user
    try {
        var query = "select * from usuarios where usuario = ? and password = ? limit 1";
        var rows = await pool.query(query, [usuario, md5(password)]); // cambie user
        return rows[0];
    } catch (error) {
        // throw error;
        console.log(error);
    }

}

module.exports = {getUserByUsernameAndPassword}