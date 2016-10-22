'use strict'

var fs = require('fs')
var path = require('path')

// Define um objeto Vue global para o app.js server-side
global.Vue = require('vue')

// Obtém o layout HTML básico
var layout = fs.readFileSync('./index.html', 'utf8')

// Cria um renderizador
var renderer = require('vue-server-renderer').createRenderer()

// Cria um servidor Express
var express = require('express')
var server = express()

// Serve estaticamente os arquivos do diretório assets
server.use('/assets', express.static(
  path.resolve(__dirname, 'assets')
))

// Intercepta todas as requisições GET
server.get('*', function (request, response) {
  // Renderiza nosso aplicativo Vue como uma String
  renderer.renderToString(
    // Cria uma instância do app para renderizar
    require('./assets/app')(),
    // Manipula o resultado renderizado
    function (error, html) {
      // Se ocorreu alguma erro enquanto processava...
      if (error) {
        // Registra o erro no console
        console.error(error)
        // Informa o cliente que algo errado aconteceu
        return response
          .status(500)
          .send('Server Error')
      }
      // Senão, envia o layout renderizado injetado no HTML carregado
      response.send(layout.replace('<div id="app"></div>', html))
    }
  )
})

// Levanta o servidor Express criado, escutando na porta 5000
server.listen(5000, function (error) {
  if (error) throw error
  console.log('Servidor executando em localhost:5000')
})
