const createTable = {
    'productos': async (knex)=>{
        await knex.schema.createTable('productos', (table) => {
          table.increments('id').primary()
          table.string('name').notNullable()
          table.integer('price').notNullable()
          table.string('thumbnail').notNullable()
        })
        console.log('tabla productos creada');
    },
    'mensajes': async (knex)=>{
        await knex.schema.createTable('mensajes', (table) => {
          table.increments('id').primary()
          table.string('email').notNullable()
          table.string('date').notNullable()
          table.string('message').notNullable()
        })
        console.log('tabla mensajes creada');
    }
}

const selectAll = async (knex, tabla)=>{
    try {
        const table = await knex.schema.hasTable(tabla)
        !table && await createTable[tabla](knex)
        let data = await knex.from(tabla).select('*')
        return data
    } catch (error) {
        console.log(error)
    }
}

const insertItem = async (knex, tabla, obj)=>{
    try {
        await knex(tabla).insert(obj)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {selectAll, insertItem}