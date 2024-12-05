import { relations } from "drizzle-orm/relations";
import { projects, tasks, users, usersjoinprojects, activityLog } from "./schema";

export const tasksRelations = relations(tasks, ({one, many}) => ({
	project: one(projects, {
		fields: [tasks.projectId],
		references: [projects.id]
	}),
	user: one(users, {
		fields: [tasks.assignedTo],
		references: [users.id]
	}),
	activityLogs: many(activityLog),
}));

export const projectsRelations = relations(projects, ({many}) => ({
	tasks: many(tasks),
	usersjoinprojects: many(usersjoinprojects),
}));

export const usersRelations = relations(users, ({many}) => ({
	tasks: many(tasks),
	usersjoinprojects: many(usersjoinprojects),
	activityLogs: many(activityLog),
}));

export const usersjoinprojectsRelations = relations(usersjoinprojects, ({one}) => ({
	project: one(projects, {
		fields: [usersjoinprojects.projectId],
		references: [projects.id]
	}),
	user: one(users, {
		fields: [usersjoinprojects.userId],
		references: [users.id]
	}),
}));

export const activityLogRelations = relations(activityLog, ({one}) => ({
	user: one(users, {
		fields: [activityLog.userId],
		references: [users.id]
	}),
	task: one(tasks, {
		fields: [activityLog.taskId],
		references: [tasks.id]
	}),
}));