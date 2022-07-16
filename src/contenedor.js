const {selectAll, insertItem} = require('./api.js')

class Contenedor{
    constructor (config, table){
        this.config = config
        this.table = table
    }

    getAll(){
        return selectAll(this.config, this.table)
    }

    addItem(obj, type){
        const date = new Date()
        const msgDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
        
        type === 'mensaje' && (obj.date = msgDate) 
        
        insertItem(this.config, this.table, obj)
    }
}

module.exports = Contenedor
