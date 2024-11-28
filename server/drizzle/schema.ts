import { pgTable, foreignKey, check, serial, integer, varchar, date, text, timestamp, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const activityLog = pgTable("activity_log", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	taskId: integer("task_id").notNull(),
	activityType: varchar("activity_type", { length: 255 }),
	timestamp: date().notNull(),
}, (table) => {
	return {
		activityLogUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "activity_log_user_id_fkey"
		}).onDelete("cascade"),
		activityLogTaskIdFkey: foreignKey({
			columns: [table.taskId],
			foreignColumns: [tasks.id],
			name: "activity_log_task_id_fkey"
		}).onDelete("cascade"),
		activityLogActivityTypeCheck: check("activity_log_activity_type_check", sql`(activity_type)::text = ANY ((ARRAY['created'::character varying, 'updated_status'::character varying, 'comented'::character varying, 'added_attachment'::character varying])::text[])`),
	}
});

export const teams = pgTable("teams", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	modifiedAt: date("modified_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const teamMembers = pgTable("team_members", {
	id: serial().primaryKey().notNull(),
	teamId: integer("team_id").notNull(),
	userId: integer("user_id").notNull(),
}, (table) => {
	return {
		teamMembersTeamIdFkey: foreignKey({
			columns: [table.teamId],
			foreignColumns: [teams.id],
			name: "team_members_team_id_fkey"
		}).onDelete("cascade"),
		teamMembersUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "team_members_user_id_fkey"
		}).onDelete("cascade"),
	}
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	role: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	modifiedAt: timestamp("modified_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => {
	return {
		usersNameKey: unique("users_name_key").on(table.name),
		usersEmailKey: unique("users_email_key").on(table.email),
		usersRoleCheck: check("users_role_check", sql`(role)::text = ANY ((ARRAY['admin'::character varying, 'member'::character varying])::text[])`),
	}
});

export const projects = pgTable("projects", {
	id: serial().primaryKey().notNull(),
	teamId: integer("team_id").notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	modifiedAt: date("modified_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => {
	return {
		projectsTeamIdFkey: foreignKey({
			columns: [table.teamId],
			foreignColumns: [teams.id],
			name: "projects_team_id_fkey"
		}).onDelete("cascade"),
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
	dueDate: date("due_date"),
	createdAt: date("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	modifiedAt: date("modified_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
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