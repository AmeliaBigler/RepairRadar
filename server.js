const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({
    helpers: {
        ifEquals: (arg1, arg2, options) => {
            return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
        }
    }
});
const router = require("./controller/index.js");
const {createServer} = require("http");
const { Server } = require("socket.io")
const ioConnection = require("./util/ioConnection.js");

const app = express();
const server = createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 3001;
const sessionSettings = session({
    secret: 'sdjfaklasdfkljasdfj;k',
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,

    store: new SequelizeStore({
        db: sequelize,
    }),
})

app.use(sessionSettings);

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(sessionSettings))

ioConnection(io)

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(router);

app.use(express.static("public"));

sequelize.sync().then(
    server.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
    })
);