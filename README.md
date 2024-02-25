# Bliss-feed (Social Media Application)

## It has been deployed as a single web app (both frontend and backend together)

### Frontend Functionalities

Below is the **Home page for Bliss-feed**

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/4a7451d1-4637-4ae7-996e-ee34ac00cb62)

On Clicking the Enter , the user will be navigated to **Login Page**

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/ebbe409d-23c7-457a-80f1-3e512a0ab93a)

If the user is not an **existing user** or if **username or password incorrect** all such **validations** has been done.

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/c1afc551-1df4-4c54-80fe-52f9617d180a)

Not an existing user, user has to **register**, and will be navigated to register form on clicking register link,
If the username or password or email id are in incorect format, they will encounter an error message to put them in valid format,

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/a9eb39e4-2103-4eff-a674-38fc374cfaf8)

**registration successful**, will navigate to login page for getting into the application,

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/3e7dd960-e9df-490f-9dc3-7c47c69464b9)

In the **post page**, all users posts will be feeded with recent post as top,

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/9c16814c-c291-4914-b4fb-039201ecb624)

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/77efeab1-bf45-4ff7-a668-577ea39d6a52)

On Clicking the **create post**, user will be able to add his\her own post publicly

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/5e8cfa4c-3888-448c-ae12-94803885af69)

after clicking **ADD Post**, the user could find his post at the top in the feed

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/fcec1fbb-d1ca-42eb-aea6-01c5c26b3fd8)

User can **view** his profile and can also **update** it,

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/0a141d1c-00c2-40fc-ba59-35f3848d7e03)

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/36cb61e4-aa1e-47fb-862e-3698b42c52a8)

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/28740bca-6887-419c-946b-809eaf28057a)

User can also **search user** by his or her username,

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/c31c733a-198f-4f22-9d32-f4d38b1a4969)

Then user can logout by clicking **logout** button.

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/7d331282-642d-4453-8ba1-8a7a23eed0a1)


### backend Functionalities

**database schema**
### Queries are below

create database social_media;
use social_media;

**users table** for storing users details at the time of registration and to allow only authenticated user

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

**Posts table** which is used to store the post of the users 

CREATE TABLE Posts (
    postid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    post_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES Users(id)
);

Here are the **backend api** calls screenshots

**Users:**

GET /users - List of all users

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/1191c3a3-e9fd-4ed3-8777-fd85a1adc7ed)


GET /users/:name - Search by particular user name

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/4b15adb6-ae2b-4678-87bc-429efc5c25e8)

**Posts:**

GET /posts - List of all posts

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/e9a80ee6-b353-412c-808b-7bf8f5017d24)

GET /users/:name/posts - List all posts by particular user name

![image](https://github.com/Abinayavs/blissfeed/assets/118355748/1ddbd1a9-8ab7-47a4-a0f7-932c640c876f)
















