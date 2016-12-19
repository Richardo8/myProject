var express = require('express')
var path = require('path')
var compression = require('compression')

import React from 'react'
import { renderToString } from 'react-dom/serve'
import { match, RouterContext } from 'react-router'
import router from './components/routes'

var app = express()

app.use(compression())
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'public')))

// app.get('*',function (req, res) {
//     res.sendFile(path.join(__dirname, public, 'index.html'))
// })

app.get('*', (req, res) => {
    match({ routes: routes, location: req.url}, (err, redirect, props) => {
        if(err){
            res.status(500).send(err.message)
        } else if(redirect) {
            res.redirect(redirect.pathname + redirect.search)
        } else if(props) {
            const appHtml = renderToString(<RouterContext {...props}/>)
            res.send(renderPage(appHtml))
        } else {
            res.status(404).send('Not Found')
        }
    })
})

function renderPage(appHtml) {
    return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
    `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
    console.log('Production Express server running at localhost: ' + PORT)
})