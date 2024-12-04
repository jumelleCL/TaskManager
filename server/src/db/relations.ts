import { relations } from "drizzle-orm/relations";
import { projects, projectsMembers, users, tasks, activityLog } from "./schema";

export const projectsMembersRelations = relations(projectsMembers, ({one}) => ({
	project: one(projects, {
		fields: [projectsMembers.projectId],
		references: [projects.id]
	}),
	user: one(users, {
		fields: [projectsMembers.userId],
		references: [users.id]
	}),
}));

export const projectsRelations = relations(projects, ({many}) => ({
	projectsMembers: many(projectsMembers),
	tasks: many(tasks),
}));

export const usersRelations = relations(users, ({many}) => ({
	projectsMembers: many(projectsMembers),
	tasks: many(tasks),
	activityLogs: many(activityLog),
}));

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