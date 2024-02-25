/*const express = require('express');
const mysql = require('mysql');
//const connection = require('./server');
const apiRouter = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME
});

db.connect((err) => {
if (err) {
  throw err;
}
console.log('Connected to MySQL database');
});

// GET /users - List of all users
apiRouter.get('/users', (req, res) => {
    
    const sql = 'SELECT username, email FROM Users';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error fetching users" });
      }
      res.status(200).json(results);
    });
});

apiRouter.get('/users/:name', (req, res) => {
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

apiRouter.get('/posts', (req, res) => {  
    
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

apiRouter.get('/users/:name/posts', (req, res) => {
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

module.exports = apiRouter;*/