const router = require("express").Router();
const {
  deleteComment,
  getAllComments,
  createComment,
} = require("../../controllers/comment-controller");
const withAuth = require("../../utils/auth");

router.get("/", getAllComments);

router.post("/", withAuth, createComment);

router.delete("/:id", withAuth, deleteComment);

module.exports = router;
