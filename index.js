const app = require('./src/app');
require('./db/db.connection');

let port =process.env.PORT 
app.listen(port, (() => console.log(`Connected successfully to ${port}`)))
