require('dotenv').config();

const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.STRING_CONEXION,{
    
})
    .then(db=> console.log('Se ha conectado a la base de datos'))
    .catch(err => console.log(err));