const express = require("express")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const sequelize = require("./config/connection")
const { Ticket } = require("./models/index")

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

app.get("/", async (req, res) => {
    try {
        const ticketData = await Ticket.findAll()
        const tickets = ticketData.map(ticket => ticket.get({ plain: true}))
        res.render("home", { tickets : tickets, user: req.session.username})
    } catch (error) {
        res.status(500).json(error)
    }
})

sequelize.sync().then(
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`)
    })
)