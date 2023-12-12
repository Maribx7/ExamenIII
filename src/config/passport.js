const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const usuario = require('../models/Usuarios')
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'Cedula',
    passwordField: 'Contraseña'
}, async (Cedula, constraseña, done) => {
    try {
        // Validar correo
        const user = await usuario.findOne({ Cedula });

        if (!user) {
            return done(null, false, { message: 'No se encontró el usuario' });
        }

        console.log('constraseña:', constraseña);
        console.log('user.Contraseña:', user.Contraseña);

        bcrypt.compare(constraseña, user.Contraseña)
            .then(valida => {
                console.log('Valida:', valida);

                if (valida) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
            })
            .catch(error => {
                return done(error);
            });
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usuario.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
