const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const handlebars = require('express-handlebars')
const Routes = require('./routes/routes.js')
const app = express()
const routes = Routes()

app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
    layoutsDir: `./views/layouts`,
    extname: 'hbs',
    defaultLayout: 'main',
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json())
app.use(cors())

app.get('/', routes.home)
app.post("/cars/search", routes.search)
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('Your app is running on port: ', port)
})