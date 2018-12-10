// utilisation du Model User pour faire le lien avec la BD
var UserModel = require('../models/UserModel');

// utilisation des jetons JWT pour sécuriser
var jwt = require("jsonwebtoken");

// définition du controller sous la forme d'un objet JS avec des propriétés
var UserController = {
    liste: function(req,res){
        UserModel.find(function(err,users){
            if (err) {
                console.log(err);
                res.json({status: false, message: err.message})
            } else {
                res.json({status: true, users: users})
            }
        })
    },

    ajout: function(req,res){
        var newUser = new UserModel(req.body);
        newUser.validate()
        .catch((user) => res.json({status: false, message: "user validation failed:"+ user }))
        .then(() => newUser.save())
        .then(() => res.json({status: true, message: "user ajouté"}))
        .catch (() =>  res.json({status: false, message: "un user avec cet id existe déjà"}))
    },

    demandejeton: function(req,res){
        if(req.query.name){
            if(req.query.password){
                UserModel.findOne({'name': req.query.name, 'password': req.query.password})
                .then((user) =>  {
                    if(user){
                        var token = jwt.sign( { name: req.query.name, password: req.query.pwd, admin: req.params.admin },
                            'maclesecrete', { expiresIn: '1h'});
                        res.json({ status: true, token: token })
                    } else {
                        res.json({status: false, message: "name et/ou password incorrects"});
                    }
                })
            } else {
                res.json({ status: false, message: "name et/ou password absents"})
            }

        } else {
            res.json({ status: false, message: "name et/ou password absents"})
        }
    },

    verifjeton: function(req,res){
        if(req.query.token){
            jwt.verify( req.query.token, 'maclesecrete', function(err,payload){
                if (err) {
                    res.json({status: false, message: "token incorrect:" + err.message})
                } else {
                    console.log(payload);
                    res.json({status: true, message: "token correct:" + payload});
                }
            })
        } else {
            res.json({status: false, message: "token absent"});
        }
    },

    verifJWT: function(req,res,next){
        var token = req.body.token || req.query.token;
        if (token) {
            jwt.verify(token, 'maclesecrete', function(err,payload) {
                if (err) { 
                    return res.json({status:false, message:'token incorrect : ' + err.message});
                } else { 
                    req.payload = payload; 
                    //res.json({status: true, message: "token correct:" + payload});
                    next(); 
                }
            });
        } else {
            return res.status(403).send({ status : false, message: 'token absent'});
        }
    },

    verifAdmin: function(req,res,next){
        console.log(req);
        if(req.payload.name == 'admin'){
            // token de l'admin
            next();
        } else {
            return res.json({status:false, message:'le token ne correspond pas à l\'admin'});
        }
    }
}; 

// interface du module
module.exports = UserController;
