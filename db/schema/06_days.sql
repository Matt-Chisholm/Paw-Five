DROP TABLE IF EXISTS days CASCADE;
CREATE TABLE days (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(55) NOT NULL,
  uv INTEGER NOT NULL,
  pv INTEGER NOT NULL,
  fill VARCHAR(255)
);