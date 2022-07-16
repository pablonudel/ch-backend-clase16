const socket = io()

let renderProdTable = (products) => {
    if(products.length > 0){
        document.getElementById('productList').innerHTML =`
        <table class="table align-middle mt-3">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th class="text-end">Foto</th>
                </tr>
            </thead>
            <tbody id="productTable"></tbody>
        </table>
        `
    }else{
        document.getElementById('productList').innerHTML = '<div class="alert alert-info text-center">No hay productos</div>'
    }
    renderProd(products)
}

const addProdRow = (product) => {
    return  `
        <tr>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td><img style="height:64px;" class="float-end" src=${product.thumbnail} alt=""></td>
        </tr>
    `
}

const addMsg = (message) => {
    return  `
    <div class="card bg-light border-0 mb-4 position-relative">
        <span class="badge rounded-pill text-bg-primary position-absolute top-0 start-3 translate-middle-y">${message.email}</span>
        <div class="card-body">
            <span class="small d-block text-secondary mb-2"><i>${message.date}</i></span>
            ${message.message}
        </div>
    </div>
    `
}

const renderProd = (products) => {
    products.forEach(product => {
        document.getElementById('productTable').innerHTML += addProdRow(product)
    });
}

const renderMsg = (messages) => {
    document.getElementById('msgList').innerHTML = ''
    if(messages.length > 0){
        messages.forEach(message => {
            document.getElementById('msgList').innerHTML += addMsg(message)
        });
    }else{
        document.getElementById('msgList').innerHTML = '<div class="alert alert-info text-center">No hay mensajes</div>'
    } 
}

const addProduct = (e)=>{
    const product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value 
    }
    if(product.name.length > 0 && product.price.length > 0 && product.thumbnail.length > 0) {
        socket.emit('nuevo producto', product)
        document.getElementById('name').value=''
        document.getElementById('price').value=''
        document.getElementById('thumbnail').value=''
        document.getElementById('alert').innerHTML = ''
        return false
    }else{
        document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Debe completar todos los campos</div>'
        return false
    }
}

const addMessage = (e)=>{
    const msg = {
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    }
    if(msg.email.length > 0 && msg.message.length > 0) {
        socket.emit('nuevo mensaje', msg)
        document.getElementById('message').value=''
        return false
    }  
}

const myModalEl = document.getElementById('exampleModal')
const modalListener = () => { myModalEl.addEventListener('hidden.bs.modal', event => {
    document.getElementById('alert').innerHTML = ''
    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('thumbnail').value = ''
})
}

const enableBtn = () => {
    if (document.getElementById('email').value === ''){
        document.getElementById('btnSendMsg').disabled = true
    }else{
        document.getElementById('btnSendMsg').disabled = false
    }
}

socket.on('productos', products => {
    renderProdTable(products)
})
socket.on('mensajes', messages => {
    renderMsg(messages)
})