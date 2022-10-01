const { Post, Comment, User } = require("../models");

module.exports = {
  loadAllPostsPage: (req, res) => {
    Post.findAll({
      include: [User],
    })
      .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(JSON.stringify(posts));
        res.render("homepage", {
          posts,
          loggedIn: req.session.loggedIn ? true : false,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  loadSinglePostPage: (req, res) => {
    Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    })
      .then((dbPostData) => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });

          res.render("single-post", {
            post,
            loggedIn: req.session.loggedIn ? true : false,
          });
        } else {
          res.status(404).end();
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  loadLoginPage: (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    console.log(">>>>>not logged in");
    res.render("login");
  },

  loadSignUpPage: (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }

    res.render("signup");
  },
};
