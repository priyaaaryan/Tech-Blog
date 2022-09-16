const { User, Post } = require("../models");

module.exports = {
  loadAllPostAdminPage: (req, res) => {
    Post.findAll({
      include: {
        model: User,
        attributes: ["username"],
      },
      where: {
        user_id: req.session.user_id,
      },
    })
      .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log("ahahahahahah" + JSON.stringify(posts));
        res.render("dashboard", {
          posts,
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/login");
      });
  },

  //loadNewPostPage: (req, res) => {
  //res.render("new-post", {});
  //},

  loadEditPostPage: (req, res) => {
    Post.findByPk(req.params.id)
      .then((dbPostData) => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });

          res.render("edit-post", {
            post,
          });
        } else {
          res.status(404).end();
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
