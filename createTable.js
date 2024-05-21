import { sql } from "./db.js";

/* sql`DROP TABLE IF EXISTS cars`
  .then(() => {
    console.log('Tabela deletada')
  }) */

sql`
  CREATE TABLE cars (
    id    TEXT PRIMARY KEY,
    name  TEXT,
    year  INTEGER,
    price INTEGER
  )
`
.then(() => {
  console.log('A tabela foi criada')
})
.catch((err) => {
  console.log('erro:' + err)
})