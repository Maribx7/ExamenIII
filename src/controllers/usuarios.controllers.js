const controlusuario = {};
const Usuarios = require('../models/Usuarios');
const modelo = require('../models/Usuarios');
const { ModificarUsuarios, renderModificar } = require('../controllers/usuarios.controllers');
const passport = require('passport');
const bcrypt = require('bcrypt');

//Para renderizar el Login
controlusuario.renderlogin = (req,res) => {
    res.render('Login');
    console.log('Se ha cargado pagina del login');
}

//Para recibir los datos
controlusuario.iniciosesion = passport.authenticate('local',{
    failureRedirect: '/Login',
    successRedirect: '/Usuario', 
    failureFlash: true

}); 



//para renderizar el form
controlusuario.renderUsuarios = (req,res) =>{
    res.send('usuarios') 
    console.log('Se han enviado los usuarios');
}
//para renderizar el form
controlusuario.renderListar = async (req,res) =>{
    try {
        const usuarios = await Usuarios.find().lean(); 
        res.render('Listar', { usuarios });
        console.log('Lista de usuarios en la base de datos: ',usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la base de datos');
        
    }
}
//para renderizar el form
controlusuario.renderModificar = async (req,res) =>{
    try {
        const usuario = await Usuarios.findById(req.params.id).lean();
        res.render('Modificar', { usuario }); 
        console.log('Se ha cargado el usuario listo para modificar: ', usuario)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la base de datos');
    }
}

//Para modificar
controlusuario.ModificarUsuarios = async (req,res) =>{
    const usuarios = await Usuarios.find();
    const { Cedula, Nombre, PrimerApellido, SegundoApellido, Telefono, Correo,Contraseña} = req.body;
    let hashedPassword = Contraseña;
    if (Contraseña) {
        hashedPassword = bcrypt.hashSync(Contraseña, 10);
    }
    await Usuarios.findByIdAndUpdate(req.params.id, {Cedula, Nombre, PrimerApellido, SegundoApellido, Telefono, Correo,Contraseña: hashedPassword} );
    console.log('Se han echo modificaciones en la base de datos ');
    res.redirect('/Listar');
}

//para registrar
controlusuario.RegistrarUsuarios = async (req,res) =>{
    const errors = [];
    const {Cedula, Nombre, PrimerApellido, SegundoApellido, Telefono, Correo, Contraseña} = req.body;
    
    //validacion de minimo 4 caracteres para la contraseña
    const Ced = await Usuarios.findOne({Cedula:Cedula});
    if (Ced){
        errors.push({Text: 'Cedula en uso, intente iniciar sesion'})
    }
    if (Contraseña.length < 4){
        errors.push({Text: 'La contraseña debe tener minimo 4 caracteres'})
    }
    if (Cedula.length === 0 || Nombre.length === 0 || PrimerApellido.length === 0 || SegundoApellido.length === 0 || Telefono.length === 0 || Correo.length === 0 || Contraseña.length === 0) {
        
        errors.push({Text: 'No debe dejar ningun dato vacio. Intente nuevamente'})
    }
    
    if (errors.length > 0) {
        console.log('Errores detectados:', errors);
        res.render('Login', {errors})
    }else {
        const hashedPassword = bcrypt.hashSync(Contraseña, 10);
        
        const nuevoUsuario = new Usuarios({
            Cedula,
            Nombre,
            PrimerApellido,
            SegundoApellido,
            Telefono,
            Correo,
            Contraseña: hashedPassword
        });
        console.log('Ingreso de nuevo usuario: ',nuevoUsuario);
        await nuevoUsuario.save();
        
        res.send('Se ha agregado un usuario nuevo a la base de datos')
    }

    
}

//para mostrar lista de usuarios
controlusuario.MostrarUsuarios = async (req,res) =>{
    const usuarios = await Usuarios.find();
    console.log(usuarios)
    console.log(__dirname);
    res.render('Listar', {usuarios});
}

//para eliminar a un usuario
controlusuario.EliminarUsuarios = async (req,res) =>{
   await Usuarios.findByIdAndDelete(req.params.id);
   console.log('Se ha eliminado un usuario');
   res.redirect('/Usuario')
}

module.exports = controlusuario;