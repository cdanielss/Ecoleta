/* verbose serve para mostrar mensagem do banco */
const sqlite3 = require("sqlite3").verbose()

/* Cria o objeto que ira fazer operações no banco */
const db = new sqlite3.Database("./src/database/database.db")

// usa as configuranções do arquivo ManipulandoBanco.txt AQUI
// exportando o banco para outras partes do codigo


//apagando
/* db.run(`DELETE FROM places WHERE id = ?`, [13], function(err){
    if(err){
        return console.log(err)
    }
    console.log("Dados apagados com Sucesso")
}) */
module.exports = db