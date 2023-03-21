const express = require("express")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const sequelize = require("./config/connection")

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

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("home", { user: req.session.username})
})

sequelize.sync().then(
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`)
    })
)