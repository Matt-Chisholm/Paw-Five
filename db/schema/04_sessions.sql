DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY NOT NULL,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  timestamp TIMESTAMPTZ
);

SET timezone = 'America/Los_Angeles';