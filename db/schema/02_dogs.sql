DROP TABLE IF EXISTS dogs CASCADE;
CREATE TABLE dogs (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  breed VARCHAR(50) NOT NULL,
  avatar TEXT NOT NULL,
  skill_id INTEGER
);