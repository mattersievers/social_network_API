const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/user-controller');


//Basic user CRUD operations
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

//friend post and delete operations    
router
    .route('/:userId/friend/:friendId')
    .post(createFriend)
    .delete(deleteFriend)

module.exports = router;