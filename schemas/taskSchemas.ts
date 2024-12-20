import { z } from 'zod'

const AddTaskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, 'Title required'),
    description: z.string().optional(),
    projectId: z.number().min(1, 'Project required'),
    priority: z.enum(['high', 'medium', 'low']).optional(),
    status: z.enum(['pending', 'in_progress', 'completed']).optional()
})

const UpdateTaskSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    projectId: z.number().min(1, 'Project required'),
    priority: z.enum(['high', 'medium', 'low']),
    status: z.enum(['pending', 'in_progress', 'completed']),
    assigned_to: z.number().optional(),
})

export { AddTaskSchema, UpdateTaskSchema }