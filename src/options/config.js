const knex = {
    'mysql': require('knex')({
        client: 'mysql',
        connection: {
          host : 'localhost',
          port : 8889,
          user : 'root',
          password : 'root',
          database : 'ecommerce'
        }
      }),
    'sqlite': require('knex')({
        client: 'sqlite3',
        connection: {
            filename: './DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
      })
}

module.exports = {knex}