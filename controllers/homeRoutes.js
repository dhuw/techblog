const router = require('express').Router();
// const { where } = require('sequelize/types');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id','user_id','post_id','create_date']
        }
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((Post) => Post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {
    logged_in: req.session.logged_in
  });
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup', {
  });
});

router.get('/dashboard', async (req, res) => {
  try {
    // Get all posts by the current session user id 
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        user_id: req.session.user_id,
      }
    });

    // Serialize data so the template can read it
    const posts = postData.map((Post) => Post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Display a single blog post
router.get('/:id', async (req, res) => {
  try {
    // Get all posts and JOIN with user data of ID /:id
    const postData = await Post.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((Post) => Post.get({ plain: true }));


    //Check if post user_id is same as sess id, and show del and edit buttons if true
    let editable = false;
    if (posts[0].user_id == req.session.user_id) {
      editable = true;
    };

    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        post_id: req.params.id,
      },
    
    });

    const comments = commentData.map((Comment) => Comment.get({ plain: true }));


    // Pass serialized data and session flag into template
    res.render('post', {
      posts,
      logged_in: req.session.logged_in,
      editable,
      comments,
      postID: req.params.id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/postupdate/:id', async (req, res) => {
  try {
    // Get all posts and JOIN with user data of ID /:id
    const postData = await Post.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((Post) => Post.get({ plain: true }));


    // Check if post user_id is same as sess id, and show del and edit buttons if true
    let editable = false;
    if (posts[0].user_id == req.session.user_id){
      editable = true;
    };


    // Pass serialized data and session flag into template
    res.render('postUpdate', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/updatepost/:id', async (req, res) => {
  // console.log("Start of post route");
  // console.log(req.body);
  try {
    const updatedPost = await Post.findOne({
      where: {
        id: req.params.id
      }
    });
    const newUpdate = updatedPost.update({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newUpdate);
  } catch (err) {
    res.status(400).json(err);
    console.log(" ERRORRRR from postRoutes.js");
  }
});

module.exports = router;
