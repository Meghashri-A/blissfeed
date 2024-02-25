//backend
//database schema
create database social_media;
use social_media;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE Posts (
    postid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    post_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES Users(id)
);

//backend api calls
Users:
GET /users - List of all users
GET /users/:name - Search by particular user name

Posts:
GET /posts - List of all posts
GET /users/:name/posts - List all posts by particular user name
![image](https://github.com/Abinayavs/blissfeed/assets/118355748/448b3ec0-8336-48b8-bfd8-b694bde4e137)




