const Thing = require('../models/thing')
const fs = require('fs')

exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce)
    delete sauceObjet._id
    delete sauceObjet._userId
    const thing = new Thing({
      ...sauceObjet,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    thing.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({  error }))
  }

exports.getOneSauce = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllSauce = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  }

  exports.modifySauce = (req, res ,next) => {
    if (req.file) {
    Thing.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Thing.updateOne({ _id: req.params.id }, { 
              name: req.body.sauce.name,
              manufacturer: req.body.sauce.manufacturer,
              description: req.body.sauce.description,
              mainPepper: req.body.sauce.mainPepper,
              heat: req.body.sauce.heat,
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
              _id: req.params.id 
              }) 
            .then(() => res.status(200).json({ message: 'Sauce et image modifiées' }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(400).json({ error }));
    } else {
    Thing.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        heat: req.body.heat,
        _id: req.params.id }) 
      .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
    .catch((error) => res.status(400).json({ error }));
    }
    };

exports.deleteSauce = (req, res, next) => {
  Thing.findOne({_id: req.params.id})
  .then(thing => {
    if(thing.userId != req.auth.userId){
      res.status(400).json({message: 'Non-autorisé'})
    }else{
      const filename = thing.imageUrl.split('/images')[1]
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({_id: req.params.id})
          .then(() => {res.status(200).json({message: 'Objet supprimé !'})})
          .catch(error => res.status(400).json({ error }))
      })
    }
  })
}

exports.likeSauce = (req, res ,next) => {
  Thing.findOne({_id: req.params.id})
    .then((sauce) => {
      const like = req.body.like
      const userId = req.auth.userId
      if(like === 1){
        if(!sauce.usersLiked.find(id => id ==userId)){
          sauce.usersLiked.push(userId)
        }
      } else if(like === 0){
        sauce.usersDisliked = sauce.usersDisliked.filter(id => id != userId)
        sauce.usersLiked = sauce.usersLiked.filter(id => id != userId)
      } else if(like === -1){
        if(!sauce.usersDisliked.find(id => id ==userId)){
          sauce.usersDisliked.push(userId)
        }
      }
      sauce.likes = sauce.usersLiked.length
      sauce.dislikes = sauce.usersDisliked.length
      console.log(sauce)
      sauce.save()
    })
  .then(() => res.status(201).json({message: 'Objet liké !'}))
  .catch(error => res.status(400).json({ error }))
}

