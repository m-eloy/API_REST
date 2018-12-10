// utilisation d'un routeur Express
var express = require('express');
var membreRouter = express.Router();

// utilisation du controlleur de gestion des membres
var MembreController = require('../controllers/MembreController');

// utilisation du controlleur de gestion des users
var UserController = require('../controllers/UserController');

// vérification d'un jeton correct avant d'accéder aux routes
membreRouter.use(UserController.verifJWT);

// route pour la liste des membres utilisant la méthode liste du controlleur
membreRouter.get('/', MembreController.liste);

// route pour un membre utilisant la méthode index du controlleur
membreRouter.get('/:id', MembreController.index);

// route pour ajouter un membre utilisant la méthode ajout du controlleur
membreRouter.post('/',MembreController.ajout);

// route pour modifier un membre utilisant la méthode modification du controlleur
membreRouter.put('/',MembreController.modification);

// route pour supprimer un membre utilisant la méthode suppression du controlleur
membreRouter.delete('/:id', MembreController.suppression);



// interface du module
module.exports = membreRouter;