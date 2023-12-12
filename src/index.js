const app = require('./servidor');
require('./BDMongo');


app.listen(app.get('port'),()=>{

    console.log('Sevidor en puerto;',app.get('port'))
})