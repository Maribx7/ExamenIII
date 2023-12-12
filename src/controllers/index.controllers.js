const ControlIndex = {};
const Usuarios = require('../models/Usuarios');
const passport = require('passport');

ControlIndex.renderRegistrar = (req,res)=>{
    res.render('index')
}
ControlIndex.renderModificar = (req,res)=>{
    res.render('Modificar')
}
ControlIndex.renderEliminar = (req,res)=>{
    res.render('Eliminar')
}
ControlIndex.renderListar = (req,res)=>{
    res.render('Listar')
}
ControlIndex.renderLogin = (req,res)=>{
    res.render('Login')
}
ControlIndex.ModificarUser = async(req,res)=>{
    const usuarios = await Usuarios.find();
    const { Cedula, Nombre, PrimerApellido, SegundoApellido, Telefono, Correo,Contraseña} = req.body;
    await Usuarios.findByIdAndUpdate(req.params.id, {Cedula, Nombre, PrimerApellido, SegundoApellido, Telefono, Correo,Contraseña});
    res.redirect('/ModificarUsuarios');
}

ControlIndex.iniciosesion = passport.authenticate('local',{
    failureRedirect: '/Login',
    successRedirect: '/Listar', 
    failureFlash: true

}); 


module.exports = ControlIndex;