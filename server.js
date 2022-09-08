const exphbs = require("express-handlebars");
const routes = require("./routes");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
const sequelize = require("./config/connection");
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Load the code for express into the express variable.
const express = require("express");

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Initialize (create) the express object.
const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session(sess));

// turn on routes
app.use(routes);
const HOST = "0.0.0.0";

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  //One method/function that starts the server
  app.listen(PORT, HOST, () => console.log("Now listening on port " + PORT));
});

// // Added to support local host to fetch the api//
// import dns from "node:dns";
// dns.setDefaultResultOrder("ipv4first");
