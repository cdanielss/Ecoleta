const express = require("express")
const server = express() 

//pegar o banco de dados do module require
const db = require("./database/db.js")

/* Configurando a pasta publica */
server.use(express.static("public"))


/* utilizando template engine (nunjucks) serve para utilizarmos estruturas de repeticao no html*/
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

/* Configurando as rotas do app */
/* req = requisicao  res = resposta */
/* pagina inicial */
server.get("/", function(req, res) {
    /* Envie um arquivo */
    return res.render("index.html")
} )

/* pagina de cadastro */
server.get("/createpoint", function(req, res) {
    /* Envie um arquivo */
    return res.render("createpoint.html")
} )

/* pagina de resultados */
server.get("/search", function(req, res) {
    //pegar os dados do banco
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err){
            return console.log(err)
        }
        /* Conta o total de elementos usando legth */
        const total = rows.length
        return res.render("search.html", { places: rows, total: total })
    })
    
} )

/* Ligar o servidor na porta escolhida */
server.listen(3000)