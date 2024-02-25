# Bliss-feed (Social Media Application)
## It has been deployed as a single web app (both frontend and backend together)

### Frontend Functionalities



//**backend**
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

//backend api calls screenshots
Users:
GET /users - List of all users
![image](https://github.com/Abinayavs/blissfeed/assets/118355748/448b3ec0-8336-48b8-bfd8-b694bde4e137)

GET /users/:name - Search by particular user name
![Screenshot (152)](https://github.com/Abinayavs/blissfeed/assets/118355748/28469a5e-1665-4db7-8772-5104eeaa4a2b)


Posts:
GET /posts - List of all posts
![Screenshot (153)](https://github.com/Abinayavs/blissfeed/assets/118355748/593bb4c8-acff-458a-b019-ed03b72fe112)

GET /users/:name/posts - List all posts by particular user name
![Screenshot (151)](https://github.com/Abinayavs/blissfeed/assets/118355748/0db78dfa-faef-4c54-8541-1485c85e1a87)
















