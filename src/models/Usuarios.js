const {Schema,model} = require('mongoose');

const EsquemaUsuarios = new Schema ({
    Cedula: {
        type: String,
        require:true,
        unique:true
    },
    Nombre: {
        type: String,
        require:true
    },
    PrimerApellido: {
        type: String,
        require:true
    },
    SegundoApellido: {
        type: String,
        require:true
    },
    Telefono: {
        type: String,
        require:true
    },
    Correo: {
        type: String,
        require:true
    },
    Contraseña: {
        type: String,
        require:true

    }

});


module.exports = model('usuarios',EsquemaUsuarios);