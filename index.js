const express = require('express');
const router = require('./routers/index.routers');
const path = require('path');
const app = express();

app.set('PORT', process.env.PORT || 3001);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.set(express.json());

//middleware
app.use(express.static(path.join(__dirname, 'public')))
// app.use("/wallet", require('./routes/index'))

//routes
//main
const fs = require('fs');
const data = fs.readFileSync('data.json');
const movimiento = JSON.parse(data).movimientos;
app.use('/', (req, res)=> res.render('index', {'title': 'Movimientos', 'movimiento': movimiento }))


//applying router
router(app); //le envío la app a la función router, para que gestione las rutas

app.listen( app.get('PORT'), () => console.log(`server listen  to port ${app.get('PORT')}`) );