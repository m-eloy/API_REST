// utilisation de MongoDB
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// le schéma d'un document de la collection membres
var membreSchema = mongoose.Schema ({
    id : {type: Number, required: true, unique: true},
    annee : {type: Number, required: true},
    nom : {type:String, uppercase:true, required: true},
    prenom : {type:String, uppercase:true, required: true},
    categorie : {type:String, enum:['junior','senior', 'cadet']},
    sexe : {type:String, enum:['Hommes','Femmes']},
    cnu : String,
    discipline : String,
    corps : String,
    academie : { code_academie: {type: Number, required: true}, nom: {type: String, required: true} },
    region : { code_region : Number, nom : String },
    etablissement : String
})

// le model MongoDB faisant le lien avec la collection
var MembreModel = mongoose.model("membre", membreSchema);

// interface du module
module.exports = MembreModel;