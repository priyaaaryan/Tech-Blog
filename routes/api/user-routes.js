//First letter that is a capital means it is a Class/Datatype.

const userController = require("../../controllers/user-controller");

//() means it is a constructor because Router is the name of a class and it is being used as a functions.
const router = require("express").Router();

// GET /api/users
router.get("/", userController.getAllUsers);

// GET /api/users/1
router.get("/:id", userController.getUser);

// POST /api/users (Note to self: Post is a way to send information to the server after the request is sent - without any relation to the URL. )
router.post("/", userController.createUser);

// PUT /api/users/1
router.put("/:id", userController.updateUser);

// DELETE /api/users/1
router.delete("/:id", userController.deleteUser);

router.post("/login", userController.loginUser);

module.exports = router;
