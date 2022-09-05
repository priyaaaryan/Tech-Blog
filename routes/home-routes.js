const router = require("express").Router();
const homeController = require("../controllers/home-controller");

// get all posts for homepage
router.get("/", homeController.loadAllPostsPage);

// get single post// sends information through the url ?key=value&key2=value2
// send information through the url /post/3 value being sent i.e., ID
router.get("/post/:id", homeController.loadSinglePostPage);

router.get("/login", homeController.loadLoginPage);

router.get("/signup", homeController.loadSignUpPage);

module.exports = router;
