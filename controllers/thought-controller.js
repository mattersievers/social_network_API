const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req,res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },    
    getThoughtById({ params }, res) {
        Thought.findOne( { _id: params.id})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    addThought( { params, body}, res) {
        Thought.create(body)
    },
    updateThought(){},
    deleteThought(){},
    postReaction(){},
    deleteReaction(){}
}

module.exports = thoughtController;