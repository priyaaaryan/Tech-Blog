//First letter that is a capital means it is a Class/Datatype.
//() means it is a constructor because Router is the name of a class and it is being used as a functions.
const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users 
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1  
router.get('/:id', (req, res) => {
    User.findOne({
      attributes: {exclude:['password']},
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /api/users (Note to self: Post is a way to send information to the server after the request is sent - without any relation to the URL. )
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', password: 'password1234'}
    User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(dbUserData =>{ res.json(dbUserData);
      
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', password: 'password1234'}
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
     //Ensures the hook gets used
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// DELETE /api/users/1
    router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/login', (req, res) => {

    // expects {username: 'lernant', password: 'password1234'}
    User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that name!' });
      return;
    }

    //res.json({ user: dbUserData });

    // Verify user
    const isValidPassword = dbUserData.checkPassword(req.body.password);
    if (!isValidPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    
    res.json({ user: dbUserData, message: 'You are now logged in!' });

  });  
  
  });

module.exports = router;