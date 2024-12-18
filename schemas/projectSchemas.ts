import { z } from 'zod'

const addProjectSchema = z.object({
    name: z.string().min(1, 'Title required').min(3, 'Title at least with 3 char'),
    description: z.string().default(''),
    // team_id: z.number().min(1,'Equipo requerido'),
    // start_date: z.string(),
    // end_date: z.string()
})

const addMembersSchema = z.object({
    email: z.string().email('Email not valid')
})

const idSchema = z.number().min(1, 'Id required')
export {addProjectSchema, idSchema, addMembersSchema}