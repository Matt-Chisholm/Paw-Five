DROP TABLE IF EXISTS tutorials CASCADE;
CREATE TABLE tutorials (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT [] NOT NULL,
  level VARCHAR (55) NOT NULL,
  logo TEXT,
  video_path TEXT
);
