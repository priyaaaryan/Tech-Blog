const router = require("express").Router();
const dashboardController = require("../controllers/dashboard-controller");
const withAuth = require("../utils/auth");

router.get("/", withAuth, dashboardController.loadAllPostAdminPage);

router.get("/new", withAuth, dashboardController.loadNewPostPage);

router.get("/edit/:id", withAuth, dashboardController.loadEditPostPage);

module.exports = router;
