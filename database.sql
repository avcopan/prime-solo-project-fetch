
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(80) UNIQUE NOT NULL,
    "password" VARCHAR(1000) NOT NULL
);

CREATE TABLE "food" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100),
  "type" VARCHAR(20),
  "user_id" INT REFERENCES "users"
);

INSERT INTO "food" (name, type, "user_id")
VALUES ('chili', 'main', 1), ('hot dogs', 'main', 2), ('chips & salsa', 'side', 3);
