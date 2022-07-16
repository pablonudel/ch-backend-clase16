const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const {knex} = require ('./src/options/config.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer) 

const Contenedor = require('./src/contenedor.js')

const productos = new Contenedor(knex['mysql'], 'productos')
const mensajes = new Contenedor(knex['sqlite'], 'mensajes')

app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

io.on('connection', async socket => {
    console.log('Usuario conectado')
    socket.emit('productos', await productos.getAll())
    socket.on('nuevo producto', async data =>{
        productos.addItem(data, 'producto')
        io.sockets.emit('productos', await productos.getAll())
    })
    socket.emit('mensajes', await mensajes.getAll())
    socket.on('nuevo mensaje', async data =>{
        mensajes.addItem(data, 'mensaje')
        io.sockets.emit('mensajes', await mensajes.getAll())
    })
})

/*----*/

app.get('/', (req,res)=>{
    res.render('pages/index')
})


const PORT = 8080 || process.env.PORT 
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', error => console.log(`Error en el servidor ${error}`))



/*
{id:1, name: 'Adobe Illustrador', price: 1000, thumbnail:'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_adobe_illustrator-64.png'},
{id:2, name: 'Adobe Photoshop', price: 2000, thumbnail:'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_adobe_photoshop-64.png'},
{id:3, name: 'Adobe Indesign', price: 800, thumbnail:'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_indesign_adobe-64.png'}
*/