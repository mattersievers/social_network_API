const { Thought, User } = require('../models');

const thoughtController = {
    
    getAllThoughts(req, res) {
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

    addThought( req , res) {
        Thought.create(req.body)
        .then( (_id) => {
            return User.findOneAndUpdate (
                {_id: req.body.userId },
                { $push: {thoughts: _id} },
                {new: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    updateThought(){},

    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
            .then(deleteThought => {
                if(!deleteThought){
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { username: deleteThought.username},
                    { $pull: {thoughts: deleteThought._id}},
                    { new: true, runValidators: true }
                );         
            })
            .then(dbUserData => {
                if(!dbUserData)  {
                    res.status(404).json( { message: 'No user with this id!'});
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    postReaction(){},

    deleteReaction(){}
}

module.exports = thoughtController;