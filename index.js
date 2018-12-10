// utilisation du serveur web Express
var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());

// utilisation de MongoDB et connection à la BD
//  la connection ne peut se faire qu'une fois dans l'application
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost/collegefrance",  { useNewUrlParser: true });

// utilisation d'un routeur d'Express
var router = express.Router();
app.use(router);

// définition d'une route de bienvenue
router.get('/',function(req,res) {
res.send('Bienvenue sur le serveur REST de l’API du Collège de France');
})

var routerMembre = require("./app/routers/MembreRouter");
app.use('/membres', routerMembre);

var routerUser = require("./app/routers/UserRouter");
app.use('/users', routerUser)

// lancer le serveur pour qu'il écoute sur le port 5000
var port = 5000;
app.listen(port);
console.log('le serveur REST est lancé sur le port ' + port);