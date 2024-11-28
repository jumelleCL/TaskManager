import { relations } from "drizzle-orm/relations";
import { users, activityLog, tasks, teams, teamMembers, projects } from "./schema";

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

export const usersRelations = relations(users, ({many}) => ({
	activityLogs: many(activityLog),
	teamMembers: many(teamMembers),
	tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({one, many}) => ({
	activityLogs: many(activityLog),
	project: one(projects, {
		fields: [tasks.projectId],
		references: [projects.id]
	}),
	user: one(users, {
		fields: [tasks.assignedTo],
		references: [users.id]
	}),
}));

export const teamMembersRelations = relations(teamMembers, ({one}) => ({
	team: one(teams, {
		fields: [teamMembers.teamId],
		references: [teams.id]
	}),
	user: one(users, {
		fields: [teamMembers.userId],
		references: [users.id]
	}),
}));

export const teamsRelations = relations(teams, ({many}) => ({
	teamMembers: many(teamMembers),
	projects: many(projects),
}));

export const projectsRelations = relations(projects, ({one, many}) => ({
	team: one(teams, {
		fields: [projects.teamId],
		references: [teams.id]
	}),
	tasks: many(tasks),
}));