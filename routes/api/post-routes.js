const router = require("express").Router();
const sequelize = require("../../config/connection");
const {
  getAllUserPosts,
  getSingleUserPost,
  createPost,
  updatePost,
  deletePost,
} = require("../../controllers/post-controller");

const withAuth = require("../../utils/auth");

// get all users
router.get("/", getAllUserPosts);

router.get("/:id", getSingleUserPost);

router.post("/", withAuth, createPost);

router.put("/:id", withAuth, updatePost);

router.delete("/:id", withAuth, deletePost);

module.exports = router;
