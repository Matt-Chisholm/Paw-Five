INSERT INTO sessions (dog_id, skill_id, description, timestamp, result) VALUES (1, 1, 'Sit', NOW()::timestamp, 'done');
INSERT INTO sessions (dog_id, skill_id, description, timestamp, result) VALUES (2, 2, 'Sit', NOW()::timestamp, 'done');
INSERT INTO sessions (dog_id, skill_id, description, timestamp, result) VALUES (3, 3, 'Sit', NOW()::timestamp, 'done');

SET timezone = 'America/Los_Angeles';