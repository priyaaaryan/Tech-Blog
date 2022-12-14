const { Comment } = require("../models");
module.exports = {
  getAllComments: (req, res) => {
    Comment.findAll()
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createComment: (req, res) => {
    // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
    Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
      .then((dbCommentData) => {
        return res.json(dbCommentData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteComment: (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbCommentData) => {
        if (!dbCommentData) {
          res.status(404).json({ message: "No comment found with this id!" });
          return;
        }
        res.json(dbCommentData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
