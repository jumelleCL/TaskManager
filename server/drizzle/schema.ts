import { pgTable, serial, varchar, text, date, unique, timestamp, foreignKey, check, integer, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const projects = pgTable("projects", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	startAndCreatedAt: date("start_and_created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	endAt: date("end_at").default(sql`(CURRENT_TIMESTAMP + '15 days'::interval day)`).notNull(),
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => {
	return {
		usersNameKey: unique("users_name_key").on(table.name),
		usersEmailKey: unique("users_email_key").on(table.email),
	}
});

export const tasks = pgTable("tasks", {
	id: serial().primaryKey().notNull(),
	projectId: integer("project_id").notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }),
	assignedTo: integer("assigned_to"),
	priority: varchar({ length: 255 }).notNull(),
	status: varchar({ length: 255 }).notNull(),
	dueDate: date("due_date").default(sql`(CURRENT_TIMESTAMP + '30 days'::interval day)`).notNull(),
	createdAt: date("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => {
	return {
		tasksProjectIdFkey: foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "tasks_project_id_fkey"
		}).onDelete("cascade"),
		tasksAssignedToFkey: foreignKey({
			columns: [table.assignedTo],
			foreignColumns: [users.id],
			name: "tasks_assigned_to_fkey"
		}).onDelete("cascade"),
		tasksPriorityCheck: check("tasks_priority_check", sql`(priority)::text = ANY ((ARRAY['high'::character varying, 'medium'::character varying, 'low'::character varying])::text[])`),
		tasksStatusCheck: check("tasks_status_check", sql`(status)::text = ANY ((ARRAY['pending'::character varying, 'in_progress'::character varying, 'completed'::character varying])::text[])`),
	}
});

export const usersjoinprojects = pgTable("usersjoinprojects", {
	projectId: integer("project_id").notNull(),
	userId: integer("user_id").notNull(),
	role: varchar({ length: 255 }).default('member').notNull(),
}, (table) => {
	return {
		usersjoinprojectsProjectIdFkey: foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "usersjoinprojects_project_id_fkey"
		}).onDelete("cascade"),
		usersjoinprojectsUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "usersjoinprojects_user_id_fkey"
		}).onDelete("cascade"),
		usersjoinprojectsPkey: primaryKey({ columns: [table.projectId, table.userId], name: "usersjoinprojects_pkey"}),
		usersjoinprojectsRoleCheck: check("usersjoinprojects_role_check", sql`(role)::text = ANY ((ARRAY['admin'::character varying, 'member'::character varying])::text[])`),
	}
});
