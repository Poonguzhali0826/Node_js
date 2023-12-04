const express = require("express")
const app = express()
const path = require('path')
const hbs = require('hbs')
const collection = require('./mongodb')

const templatePath = path.join(__dirname, '../templates')
const port = 3000;
app.use(express.json()) // connect mongodb
app.set('view engine', 'hbs') //stting all view enjine as hbs if ejs is used here instead of hbg ejs is used
app.set('views', templatePath);
app.use(express.urlencoded({
    extended: false
}))

app.get("/", (req, res) => {
    res.render("login");
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    await collection.insertMany([data])

    res.render("home")
})

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({
            name: req.body.name
        })
        if (check.password === req.body.password) {
            res.render("home")
        } else {
            res.send("Wrong Password")
        }
    } catch {
        res.send('wrong details')
    }
})

app.listen(port, () => {
    console.log(`listening on port${port}`) //nodemon is an extension  used to refresh the js file automatically if save btn is clicked
})