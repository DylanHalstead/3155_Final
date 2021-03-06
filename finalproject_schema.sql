-- DROP DATABASE IF EXISTS cinemaholics_db;
-- DROP DATABASE IF EXISTS heroku_069f9c0ece3f6df;
CREATE DATABASE IF NOT EXISTS cinemaholics_db;
USE cinemaholics_db;

CREATE TABLE IF NOT EXISTS movie (
	movie_id     VARCHAR(255),
    title        TEXT(255)     NOT NULL,
    director     VARCHAR(255)  NOT NULL,
    about        TEXT(65535)   NULL, 
    poster_url   VARCHAR(255)  NULL,
    imdb_rating  FLOAT         NOT NULL,
    imdb_votes   INT           NOT NULL,
    PRIMARY KEY (movie_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id   INT           AUTO_INCREMENT,
    username  VARCHAR(255)  NOT NULL,
    email     VARCHAR(255)  NOT NULL,
    passkey   VARCHAR(255)  NOT NULL,
    pfp       VARCHAR(255)  NOT NULL,
    about     TEXT(65535)   NULL,
    UNIQUE(username, email),
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS watchlist (
    user_id        INT,
    movie_id       VARCHAR(255),
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (movie_id) REFERENCES movie(movie_id)
);

CREATE TABLE IF NOT EXISTS user_ratings (
    user_id      INT,
    movie_id     VARCHAR(255),
    user_rating  FLOAT               NOT NULL,
    user_review  TEXT(65535)             NULL,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (movie_id) REFERENCES movie(movie_id)
);

CREATE TABLE IF NOT EXISTS admins (
    user_id       INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS posts (
    post_id    INT           AUTO_INCREMENT,
    user_id    INT           NOT NULL,
    title      VARCHAR(255)  NOT NULL,
    body       TEXT(65535)   NOT NULL,
    post_time  VARCHAR(255)  NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS post_like (
    like_id    INT AUTO_INCREMENT,
    user_id       INT NOT NULL,
    post_id     INT NOT NULL,
    PRIMARY KEY (like_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

CREATE TABLE IF NOT EXISTS replies (
	reply_id   INT            AUTO_INCREMENT,
    post_id    INT            NOT NULL,
    user_id    INT            NOT NULL,
    body       TEXT(65535)    NOT NULL,
    post_time  VARCHAR(255)   NOT NULL,
    PRIMARY KEY (reply_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

CREATE TABLE IF NOT EXISTS reply_like (
    like_id    INT AUTO_INCREMENT,
    user_id       INT NOT NULL,
    reply_id     INT NOT NULL,
    PRIMARY KEY (like_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (reply_id) REFERENCES replies(reply_id)
);


CREATE TABLE IF NOT EXISTS reply_quotes (
    reply_id    	INT NOT NULL,
    parent_id     	INT NOT NULL,
    PRIMARY KEY (reply_id),
    FOREIGN KEY (reply_id) REFERENCES replies(reply_id)
);

CREATE TABLE IF NOT EXISTS edits (
    edit_id    INT            AUTO_INCREMENT,
    user_id    INT            NOT NULL,
    post_id    INT,
	reply_id   INT,
    reason     VARCHAR(255)   NOT NULL,
    time       VARCHAR(255)   NOT NULL,
    PRIMARY KEY (edit_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (reply_id) REFERENCES replies(reply_id)
);

CREATE TABLE IF NOT EXISTS ranks (
    rank_id    			INT       		NOT NULL,
    rank_name     		VARCHAR(255) 	NOT NULL,
    PRIMARY KEY (rank_id)
);

CREATE TABLE IF NOT EXISTS issue (
	issue_id INT AUTO_INCREMENT,
	users_email VARCHAR(255) NOT NULL,
    issue_title VARCHAR(255) NOT NULL,
    issue_text TEXT(65535) NOT NULL,
    PRIMARY KEY (issue_id)
);
