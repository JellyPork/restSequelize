const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const cors = require('cors');

const arrendatariosRouter = require('./routers/arrendatarios');
const personasRouter = require('./routers/personas');
const propiedadesRouter = require('./routers/propiedades')
const propietariosRouter = require('./routers/propietarios')
const authRouter = require('./routers/auth');

const app = express();
const port = 3000;

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Configurar Passport
app.use(passport.initialize());

// Configurar CORS con opciones personalizadas
app.use(cors({
  origin: 'http://localhost:8000', // Reemplaza esto con tu URL de frontend permitida
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'] // Reemplaza esto con los encabezados personalizados permitidos
}));

// Rutas protegidas con autenticación
app.use('/arrendatarios', passport.authenticate('jwt', { session: false }), arrendatariosRouter);
app.use('/personas', passport.authenticate('jwt', { session: false }), personasRouter);
app.use('/propiedades', passport.authenticate('jwt', { session: false }), propiedadesRouter);
app.use('/propietarios', passport.authenticate('jwt', { session: false }), propietariosRouter);

// Rutas de autenticación
app.use('/auth', authRouter);

// Iniciar servidor HTTP
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
