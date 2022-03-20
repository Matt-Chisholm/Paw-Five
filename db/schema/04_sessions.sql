DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY NOT NULL,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  timestamp TIMESTAMPTZ,
  result VARCHAR(255) NOT NULL
);

SET timezone = 'America/Los_Angeles';