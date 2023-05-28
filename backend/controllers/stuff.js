const Thing = require('../models/thing')

exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce)
    delete sauceObjet.userId
    delete sauceObjet._id
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