const express = require("express")
const server = express() 

//pegar o banco de dados do module require
const db = require("./database/db.js")

/* Configurando a pasta publica */
server.use(express.static("public"))


// habilitando o uso do req.body
server.use(express.urlencoded({extended: true}))

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

//Rota que recebe os dados do formulario
server.get("/createpoint", function(req, res) {
    //pega as informacoes
    return res.render("createpoint.html")
} )

//Metodo para salvar os dados 
server.post("/savepoint", function(req, res) {
    // requisao para salvar os dados, necessario habilitar no começo do documento
    //inserindo os dados no banco
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    ` 
    /* Colocando seus valores do formulario em uma constante */
    const values = [
        req.body.imagem,
        req.body.nome,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items 
    ]
    
    /* função para retorna erro ou sucesso no cadastro */
    function afterInsertData(err) {
        if(err){
            return console.send(err)
        }
        console.log("Cadastrado com Sucesso")
        console.log(this)
        /* Criando a tela de cadastro ok */
        return res.render("createpoint.html", {saved:true})
    }
   
    db.run(query, values, afterInsertData) 
})

/* pagina de cadastro */
server.get("/createpoint", function(req, res) {
    /* Envie um arquivo */
    return res.render("createpoint.html")
} )

/* pagina de resultados */
server.get("/search", function(req, res) {
    const search = req.query.search
    if (search == ""){
        //para pesquisa vazia ira retorna isso
        return res.render("search.html", { total: 0 })
    }
    //pegar os dados do banco de acordo com a cidade, detalhe pega qualquer cidade com algo que foi digitado
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
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