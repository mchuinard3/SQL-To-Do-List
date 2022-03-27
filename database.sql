CREATE TABLE "to_do_list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(9000) NOT NULL,
	"complete" BOOLEAN NOT NULL
);

-- INSERT INTO "to_do_list" (task, complete)
-- VALUES ('grocery shopping', false), ('take out trash', false), ('call mom', false);