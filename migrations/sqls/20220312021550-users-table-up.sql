CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(60),
      email VARCHAR(200),
      password_digest VARCHAR(40)
  );