import { relations } from "drizzle-orm/relations";
import { projects, tasks, users, usersjoinprojects } from "./schema";

export const tasksRelations = relations(tasks, ({one}) => ({
	project: one(projects, {
		fields: [tasks.projectId],
		references: [projects.id]
	}),
	user: one(users, {
		fields: [tasks.assignedTo],
		references: [users.id]
	}),
}));

export const projectsRelations = relations(projects, ({many}) => ({
	tasks: many(tasks),
	usersjoinprojects: many(usersjoinprojects),
}));

export const usersRelations = relations(users, ({many}) => ({
	tasks: many(tasks),
	usersjoinprojects: many(usersjoinprojects),
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