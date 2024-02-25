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


//frontend screenshots
//home.page
![image](https://github.com/Abinayavs/blissfeed/assets/118355748/68e7139a-3c2d-4119-bc47-5d0b30da59a9)

//login page
![Screenshot (136)](https://github.com/Abinayavs/blissfeed/assets/118355748/6c3efbf8-aeb9-439a-9d89-d8dffee89d06)

//register.page
![Screenshot (137)](https://github.com/Abinayavs/blissfeed/assets/118355748/896b98d4-bf46-4f92-8897-55ec7a714ef5)
//successful registeration , login to blissfeed
![Screenshot (139)](https://github.com/Abinayavs/blissfeed/assets/118355748/e6cc461c-159b-4cc6-b393-cf46f29a3063)

//post.page
![Screenshot (140)](https://github.com/Abinayavs/blissfeed/assets/118355748/10b958c3-4e4e-4482-8852-b0bb41476bb8)
![Screenshot (141)](https://github.com/Abinayavs/blissfeed/assets/118355748/00641958-5e55-4150-aaa8-27abe25b18a1)

//search by username
![Screenshot (142)](https://github.com/Abinayavs/blissfeed/assets/118355748/1ff4ca85-4846-4168-afba-5e560264a396)

//user profile
![Screenshot (143)](https://github.com/Abinayavs/blissfeed/assets/118355748/3959b045-9a84-4f29-b04b-c2a877e99379)

//update profile
![Screenshot (144)](https://github.com/Abinayavs/blissfeed/assets/118355748/0b6543b4-c4ec-4564-a11d-499717fa253e)
//after successful update return updated version of user profile
![Screenshot (145)](https://github.com/Abinayavs/blissfeed/assets/118355748/a47e1a79-3097-460b-ba00-077d338e3202)

//loggined user create post
![Screenshot (147)](https://github.com/Abinayavs/blissfeed/assets/118355748/17e2cda4-045e-494d-a6f6-b21121ac1bd9)

//after creation appears on the feed at the top
![Screenshot (148)](https://github.com/Abinayavs/blissfeed/assets/118355748/5c5c21df-f0cc-4c13-8f83-4ae06bbcaa99)

//then user can click logout 















