DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS todos;

CREATE TABLE users
(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE todos
(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  content VARCHAR(1000) NOT NULL,
  is_deleted BOOLEAN NOT NULL
);


INSERT INTO users (username, email) VALUES ('Chris Zhang', 'chris.zhang@procore.com');
INSERT INTO users (username, email) VALUES ('Monica Bang', 'monica.bang@gmail.com');

INSERT INTO todos (user_id, content, is_deleted) VALUES (1, 'I do not want to be a termite', false);