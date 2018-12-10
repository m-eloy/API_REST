// utilisation du Model Membre pour faire le lien avec la BD
var MembreModel = require('../models/MembreModel');
// définition du controller sous la forme d'un objet JS avec des propriétés
var MembreController = {
    liste: function(req,res){
        MembreModel.find(function(err,membres){
            if (err) {
                console.log(err);
                res.json({status: false, message: err.message})
            } else {
                res.json({status: true, membres: membres})
            }
        })
    },

    index: function(req,res){
        MembreModel.findOne({'id': req.params.id})
        .then( (membre) =>  {
            if(membre){
                res.json({status: true, membres: membre})
            } else {
                res.json({status: false, message: "membre inexistant"})
            }
        })
        .catch( (err) => console.err(err.message))
    },

    ajout: function(req,res){
        var newMembre = new MembreModel(req.body);
        newMembre.validate()
        .catch((membre) => res.json({status: false, message: "membre validation failed:"+ membre }))
        .then(() => newMembre.save())
        .then(() => res.json({status: true, message: "membre ajouté"}))
        .catch (() =>  res.json({status: false, message: "un membre avec cet id existe déjà"}))
    },

    modification: function(req,res){
        MembreModel.updateOne({'id':req.body.id},{
            'id' : req.body.id,
            'annee' : req.body.annee,
            'nom' : req.body.nom,
            'prenom' : req.body.prenom,
            'categorie' : req.body.categorie,
            'sexe' : req.body.sexe,
            'cnu' : req.body.cnu,
            'discipline' : req.body.discipline,
            'corps' : req.body.corps,
            'academie.code_academie': req.body.academie.code_academie,
            'academie.nom': req.body.academie.nom,
            'region.code_region' : req.body.region.code_region, 
            'region.nom' :  req.body.region.nom,
            'etablissement' : req.body.etablissement
        })
        .then( () => res.json({status: true, message: "membre modifié"}))
        .catch( (membre) => res.json({status: false, message: membre}))
    },

    suppression: function(req,res){
        MembreModel.deleteOne({'id': req.params.id})
        .then( (membre) =>  {
            if(membre.n == 1){
                res.json({status: true, message: "membre supprimé"})
            } else {
                res.json({status: false, message: "membre inexistant"})
            }
        })
        .catch( (err) => console.err(err.message))
    }
}; 

// interface du module
module.exports = MembreController;
