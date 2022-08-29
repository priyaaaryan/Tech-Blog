DROP DATABASE IF EXIST the_tech_blog;
CREATE DATABASE the_tech_blog;
CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT,
    Username varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE POSTS (
    id int NOT NULL AUTO_INCREMENT,
    Title varchar(255) NOT NULL,
    post_url varchar(255) NOT NULL,
    user_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
); 

