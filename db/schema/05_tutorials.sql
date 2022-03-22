DROP TABLE IF EXISTS tutorials CASCADE;
CREATE TABLE tutorials (
  id SERIAL PRIMARY KEY NOT NULL,
  description VARCHAR(255) NOT NULL,
  timestamp TIMESTAMPTZ,
  video_path VARCHAR(255) NOT NULL
);

SET timezone = 'America/Los_Angeles';