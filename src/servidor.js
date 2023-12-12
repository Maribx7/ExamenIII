
//Importaciones
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride   = require('method-override');
const flash = require('connect-flash');
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/ExameFinal'
//Inicializaciones
const app = express();
require('./config/passport');
//Configuraciones

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

// Resto del código...
// Configuración de Express y middleware

app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Configuración para usar Pug

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Middleware (Funciona a medida que llegan peticiones)

app.use(express.urlencoded({extended:false}));
app.use(methodOverride ('_method'));
app.use(session({
    secret: 'secret',
    resave:true,
    saveUnitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
module.exports = {
    isAuthenticated: (req, res, next) => {
      // Si el usuario está autenticado, continúa con la solicitud
      if (req.isAuthenticated()) {
        return next();
      }
      // Si no está autenticado, redirige a la página de inicio de sesión
      res.redirect('/Login');
    }
  };
// Variables Globales

app.use((req, res, next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error= req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//Rutas

app.use(require('./routes/index.routes'));
app.use(require('./routes/usuarios.routes'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, '/public')));


module.exports = app; 

