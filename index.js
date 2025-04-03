// Requisitos para o funcionamento da aplicação
const express = require('express')
const { engine } = require('express-handlebars') 
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const path = require('path')

// Iniciando o express
const app = express()

// Template Engine 
app.engine('handlebars', engine()) 
app.set('view engine', 'handlebars')

// Response do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Session Middleware (onde serão salvas as sessões)
app.use(
    session({
        name: "session",
        secret: "our_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

// Flash messages
app.use(flash())

// Public Path
app.use(express.static('public'))

// Salvar Sessão para Resposta
app.use((req, res, next) => {
    if(req.session.userId){
        res.locals.session = req.session
    }

    next()
})

// Conexão com BD
const conn = require('./db/conn')

// Models
const RecordVaccine = require('./models/RecordVaccine')
const User = require('./models/User')
const Vaccine = require('./models/Vaccine')

// Importando Rotas
const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const recordRoutes = require('./routes/recordRoutes')
const vaccineRoutes = require('./routes/vaccineRoutes')

// Usando as Rotas
app.use(authRoutes)
app.use(dashboardRoutes)
app.use(recordRoutes)
app.use(vaccineRoutes)

// Rota raiz redireciona para home ou dashboard
app.get('/', (req, res) => {
    if (req.session.userId) {
      return res.redirect('/dashboard');
    }
    res.render('home', { 
      title: 'Immuni - Página Inicial',
      layout: 'main' 
    });
  })

// Rota para páginas não encontradas (404)
app.use((req, res) => {
    res.status(404).render('errors/404')
})

conn
    // .sync({force: true})
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000')
        })
    })
    .catch((err) => console.log(err))