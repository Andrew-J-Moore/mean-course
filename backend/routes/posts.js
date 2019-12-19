const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const PostController = require('../controllers/post-controller');



// Create Post Method
router.post("", checkAuth, extractFile, PostController.createPost);

// Fetch Posts Method
router.get('', PostController.getPosts);

// Post Delete Method
router.delete('/:id', checkAuth, PostController.deletePost);

// Post Update Method
router.put("/:id", checkAuth, extractFile, PostController.editPost)

// Fetch Individual Post Method
router.get("/:id", PostController.getPost)

module.exports = router;
