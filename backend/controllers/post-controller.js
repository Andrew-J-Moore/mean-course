const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

exports.createPost = (req,res,next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/uploads/images/' + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Post added successfully.",
      post: {
        ...result,
        id: result._id,
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Please try again later."
    })
  });
}

exports.getPosts = (req,res,next) => {
  const pageSize = +req.query.pageSize;
  const page = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && page) {
    postQuery
      .skip(pageSize * (page - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => {
      console.log(documents);
      fetchedPosts = documents;
      return Post.count();
  })
  .then(count => {
    res.status(200).json({
      message: 'Posts fetched successfully.',
      posts: fetchedPosts,
      maxPosts: count
    });
  })
  .catch(error => {
    res.status(200).json({
      message: "Please try again later."
    });
  });
}

exports.deletePost = (req,res,next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({
        message: "Deletion Successful"
      });
    } else {
      res.status(401).json({
        message: "Deletion Failed."
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Please try again later."
    })
  });
}

exports.editPost =  (req, res, next) => {

  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/uploads/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  })
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Update Successful"
      });
    } else {
      res.status(401).json({
        message: "Update Failed."
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Please try again later."
    })
  });
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Please try again later.'
    });
  });
}
