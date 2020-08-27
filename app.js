const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
    // Home Page
const cateFactCtrl = require('./controller/FactControllers/CateFactCtrl')
    //
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const { ensureAuthenticated } = require('./config/auth')

// Passport Config
require('./config/passport')(passport);

// Connect mongo
mongoose.set('runValidators', true)
mongoose.connect('mongodb+srv://coho:coho@test21-8.th8bv.mongodb.net/cohoTest?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => { console.log('✅✅ Access to MongoDB sucessfully'); })
    .catch((error) => { console.error(`error`); })

// Config Views
app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }))
app.set('view engine', 'hbs')

// Body-parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(async(req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.errors = req.flash('errors');
    res.locals.error = req.flash('error');
    res.locals.listCates = await cateFactCtrl.getListCates(req, res)
    if (req.user != undefined)
        res.locals.user = req.user.name
    next();
});

// config public folder ajhsgdas
app.use(express.static(path.join(__dirname, '/public')))

// Start Server
app.listen(3000)

// ------------- config free ------------- //

// Declare global variable ListCates 
// app.use(async(req, res, next) => {
//     res.locals.listCates = await cateFactCtrl.getListCates(req, res);
//     next();
// })

// home page
app.get('/', (req, res) => {
    var name = 'haha'
    if (req.user != undefined)
        name = req.user.name

    res.render('content/home', {
        name
    })
})

// Import Fact
const fact = require('./routers/FactRout')
app.use('/fact', fact)

// Import Cate_fact
const catefact = require('./routers/CateFactRout')
app.use('/catefact', catefact)

// Import User
const user = require('./routers/UserRout')
app.use('/user', user)