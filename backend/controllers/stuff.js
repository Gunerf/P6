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

exports.modifySauce = (req, res, next) => {
  Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
  .then(() => res.status(200).json({message: 'Objet modifié !' }))
  .catch(error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, next) => {
  Thing.findOne({_id: req.params.id})
  .then(thing => {
    console.log(thing.userId)
    console.log(req.auth.userId)
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
      const userId = req.body.userId
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
      console.log(like)
      console.log(sauce)
      sauce.save()
    })
  .then(() => res.status(201).json({message: 'Objet liké !'}))
  .catch(error => res.status(400).json({ error }))
}

