-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"start_date" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"end_date" date DEFAULT (CURRENT_TIMESTAMP + '15 days'::interval day) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"modified_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar(255) DEFAULT 'member' NOT NULL,
	"project_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "projects_members_role_check" CHECK ((role)::text = ANY ((ARRAY['admin'::character varying, 'member'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"modified_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_name_key" UNIQUE("name"),
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"assigned_to" integer NOT NULL,
	"priority" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"due_date" date NOT NULL,
	"created_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"modified_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "tasks_priority_check" CHECK ((priority)::text = ANY ((ARRAY['high'::character varying, 'medium'::character varying, 'low'::character varying])::text[])),
	CONSTRAINT "tasks_status_check" CHECK ((status)::text = ANY ((ARRAY['pending'::character varying, 'in_progress'::character varying, 'completed'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activity_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"task_id" integer NOT NULL,
	"activity_type" varchar(255),
	"timestamp" date NOT NULL,
	CONSTRAINT "activity_log_activity_type_check" CHECK ((activity_type)::text = ANY ((ARRAY['created'::character varying, 'updated_status'::character varying, 'comented'::character varying, 'added_attachment'::character varying])::text[]))
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_members" ADD CONSTRAINT "projects_members_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_members" ADD CONSTRAINT "projects_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/