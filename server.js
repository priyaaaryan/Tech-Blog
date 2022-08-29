const exphbs = require('express-handlebars');
const routes = require('./routes');
const hbs = exphbs.create({});
const sequelize = require('./config/connection');


//Load the code for express into the express variable.
const express = require ('express');
// Initialize (create) the express object.
const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// turn on routes
app.use(routes);

app.get('/',(req,res)=>{
    res.send('Hello!');
});

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    //One method/function that starts the server 
    app.listen(PORT, () => console.log('Now listening on port '+ PORT));
  });