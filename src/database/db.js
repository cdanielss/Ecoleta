/* verbose serve para mostrar mensagem do banco */
const sqlite3 = require("sqlite3").verbose()

/* Cria o objeto que ira fazer operações no banco */
const db = new sqlite3.Database("./src/database/database.db")

// exportando o banco para outras partes do codigo
module.exports = db