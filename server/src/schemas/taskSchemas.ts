import { z } from 'zod'

const AddTaskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, 'Titulo requerido'),
    description: z.string().optional(),
    projectId: z.number().min(1, 'Projecto requerido'),
    priority: z.enum(['high', 'medium', 'low']).optional(),
    status: z.enum(['pending', 'in_progress', 'completed']).optional()
})

const UpdateTaskSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    projectId: z.number().min(1, 'Projecto requerido'),
    priority: z.enum(['high', 'medium', 'low']),
    status: z.enum(['pending', 'in_progress', 'completed']),
    assigned_to: z.number().optional(),
})

const UpdateStatus = z.object({
    status: z.enum(['pending', 'in_progress', 'completed']),
})

export { AddTaskSchema, UpdateTaskSchema, UpdateStatus }