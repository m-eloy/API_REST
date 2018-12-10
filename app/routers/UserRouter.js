// utilisation d'un routeur Express
var express = require('express');
var routeurUser = express.Router();

// utilisation du controlleur de gestion des users
var UserController = require('../controllers/UserController');
var verifAdmin = UserController.verifAdmin;
var verifJWT = UserController.verifJWT;

// route pour demander un jeton utilisant la méthode demandejeton du controlleur
routeurUser.get('/demandejeton', UserController.demandejeton);

// route pour vérifier un jeton utilisant la méthode verifjeton du controlleur
routeurUser.get('/verifjeton', UserController.verifjeton);

// route pour la liste des users utilisant la méthode liste du controlleur
// si le jeton est celui de l'admin
routeurUser.get('/', verifJWT, verifAdmin, UserController.liste);

// route pour ajouter un user utilisant la méthode ajout du controlleur
// si le jeton est celui de l'admin
routeurUser.post('/', verifJWT, verifAdmin, UserController.ajout);


// interface du module
module.exports = routeurUser;