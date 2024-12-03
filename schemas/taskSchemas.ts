import { z } from 'zod'

const addTaskSchema = z.object({
    name: z.string().min(1, 'Titulo requerido'),
    description: z.string(),
    projectId: z.string().min(1,'Proyecto requerido'),
    priority: z.enum(['high', 'medium', 'low']),
    status: z.enum(['pending', 'in_progress','completed'])
})

export {addTaskSchema}