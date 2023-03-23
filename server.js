const express = require("express")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const sequelize = require("./config/connection")
const { Ticket } = require("./models/index")
const exphbs = require("express-handlebars")
const hbs = exphbs.create({})
const router = require("./controller/index.js")

const app = express()
const PORT = process.env.PORT || 3001

app.use(session({
    secret: 'sdjfaklasdfkljasdfj;k',
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,

    store: new SequelizeStore({
        db: sequelize,
    }),
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.use(router)

app.use(express.static("public"))

sequelize.sync({ force: true }).then(
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`)
    })
)