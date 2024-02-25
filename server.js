const express = require('express');
const bodyParser = require('body-parser');
const apis = require('./api');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const crypto = require('crypto');

// Hash password
const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('hex');

let loggedInUserId = null;
//MySQL Connection
const db = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME
});

const connection = db.connect((err) => {
if (err) {
    throw err;
}
console.log('Connected to MySQL database');
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
//app.use('/api/v1/', apis);

app.get("/", (req, res) => {
    res.render('home')
});


//login
app.get('/login', (req, res) => {
    res.render('login', { message: '', status: 'success' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM Users WHERE username = ?';
    db.query(sql, [username], (err, result) => {

        if (err) {
            res.status(500).send('Error logging in');
            throw err;
        }

        if (result.length === 0) {
            res.render('login', { message : 'Invalid username' ,status:'error'}); // Username doesn't exist
        } else {

            // Username exists, check password
            const user = result[0];
            if (user.password === hashPassword(password)) {
                loggedInUserId = result[0].id;
                res.redirect('/feed');
            } else {
                res.render('login', { message : 'Invalid password',status :'error' });
            }
        }
    });
});


//register
app.get('/register', (req, res) => {
    res.render('register', { message: '' });
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
  
    // Validate username format (for example, alphanumeric with length restrictions)
    const usernameRegex = /^[a-zA-Z_]{4,20}$/;
    if (!usernameRegex.test(username)) {
        return res.render('register', { message: 'Invalid username format', status: 'error' });
    }

    // Validate password format (for example, alphanumeric with length restrictions)
    let hashedpassword = '';
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.render('register', { message: 'Invalid password format', status: 'error' });
    }
    else{
      hashedpassword = hashPassword(password);
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.render('register', { message: 'Invalid email format', status: 'error' });
    }

    // Check if username or email already exists
    const checkQuery = 'SELECT * FROM Users WHERE username = ? OR email = ?';
    db.query(checkQuery, [username, email], (err, result) => {
      if (err) {
        res.status(500).send('Error registering user');
        throw err;
      }
      if (result.length > 0) {
        res.render('register', {message: 'Username or email already exists', status: 'error'});
      } else {
        const insertQuery = 'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, hashedpassword, email], (err, result) => {
          if (err) {
            res.status(500).send('Error registering user');
            throw err;
          }
          console.log('User registered successfully');
          res.render('login', {message: 'Registered successfully!! Please log in', status: 'success'});
        });
      }
    });
});

//posts
app.get('/feed', (req, res) => {
    const sql = 'SELECT Posts.*, Users.username FROM Posts JOIN Users ON Posts.userid = Users.id ORDER BY Posts.post_created_at DESC;';
    db.query(sql, (err, results) => {

        if (err) {
        res.status(500).send('Error fetching posts');
        throw err;
      }
      console.log(results);

      //no posts response
      var data = {
        posts: [],
        message: 'No public posts yet' 
      }

      if (results.length === 0) {
        res.render('posts', data);
      } else {
        data = {
          posts: results,
          message: '' 
        };
        res.render('posts', data);
      }

    });
});



//create-post router
app.get('/create/post', (req, res) => {
    res.render('createPost');
});

app.post('/create/post', (req, res) => {
    const { title, content } = req.body;

    // Insert the new post into the database
    const sql = 'INSERT INTO Posts (userid, title, content, post_created_at) VALUES (?, ?, ?, NOW())';
    db.query(sql, [loggedInUserId, title, content], (err, result) => {
        if (err) {
            res.status(500).send('Error creating post');
            throw err;
        }
        console.log('Post created successfully');
        res.redirect('/feed'); // Redirect to the homepage after creating the post
    });
});

app.get('/view', (req, res) => {
    const sql = 'SELECT username, email FROM Users WHERE id = ?';
    db.query(sql, [loggedInUserId], (err, results) => {
      if (err) {
        res.status(500).send('Error fetching user');
        throw err;
      }
      if (results.length === 0) {
        res.status(404).send('User not found');
      } else {
        const user = results[0];
        res.render('view', { user });
      }
    });
  });

  app.get('/update', (req, res) => {
    const sql = 'SELECT * FROM Users WHERE id = ?';
    db.query(sql, [loggedInUserId], (err, result) => {
    if (err) {
      res.status(500).send('Error fetching user details');
      throw err;
    }
    if (result.length === 0) {
      res.status(404).send('User not found');
    } else {
      const user = result[0];
      res.render('update', { user });
    }
  });
  });

  app.post('/updateuser', (req, res) => {
    const { username, email } = req.body;
    const sql = 'UPDATE Users SET username = ?, email = ? WHERE id = ?';
    db.query(sql, [username, email, loggedInUserId], (err, result) => {
      if (err) {
        res.status(500).send('Error updating user profile');
        throw err;
      }
      res.redirect('/update?success=true');
    });
  });

  app.get('/finduser', (req, res) => {
    const { username } = req.query;
    
    const sql = `
      SELECT Posts.*,Users.username
      FROM Posts
      JOIN Users ON Posts.userid = Users.id
      WHERE Users.username = ?
      ORDER BY Posts.post_created_at DESC
    `;
    // Query the database to find posts by the specified username
    db.query(sql, [username], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching posts');
            throw err;
        }
        if (results.length === 0) {
            const data = {
              posts: [],
              message: 'No posts yet' 
            };
            res.render('posts', data);
          } else {
            const data = {
              posts: results,
              message: 'post has retrieved' 
            };
            res.render('posts', data);
          }
    });
});

// GET /users - List of all users
app.get('/users', (req, res) => {
    
  const sql = 'SELECT username, email FROM Users';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching users" });
    }
    res.status(200).json(results);
  });
});

app.get('/users/:name', (req, res) => {
  const username = req.params.name;
  const sql = 'SELECT username, email FROM Users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching user details" });
    }
    if(results.length === 0){
      return   res.status(404).json({ message: "No such user exists" });
    }
    res.status(200).json(results);
  });
});

app.get('/posts', (req, res) => {  
  
  // SQL query to retrieve all posts 
  const sql = 'SELECT Posts.*, Users.username FROM Posts JOIN Users ON Posts.userid = Users.id ORDER BY Posts.post_created_at DESC;';

  // Execute the SQL query
  db.query(sql, (err, results) => {
    if (err) {
       res.status(500).json({ message: "Error fetching posts" });
    }
    res.status(200).json(results);
  });
});

app.get('/users/:name/posts', (req, res) => {
  const username = req.params.name; // Extract the user name from the route parameter

  // SQL query to retrieve all posts by the user with the specified name
  const sql = `
    SELECT Posts.*,Users.username
    FROM Posts
    JOIN Users ON Posts.userid = Users.id
    WHERE Users.username = ?
    ORDER BY Posts.post_created_at DESC
  `;

  // Execute the SQL query
  db.query(sql, [username], (err, results) => {
    if (err) {
      res.status(500).json({message: "Error fetching posts of a user"});
    }
    if(results.length === 0){
      return   res.status(404).json({ message: "No posts yet by such user" });
    }
    res.status(200).json(results);
  });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = connection;
//exports.db = db;