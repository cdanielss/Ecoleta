const express = require("express")
const server = express() 

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
    /* Envie um arquivo */
    return res.render("search.html")
} )

/* Ligar o servidor na porta escolhida */
server.listen(3000)