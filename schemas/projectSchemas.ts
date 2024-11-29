import { z } from 'zod'

const addProjectSchema = z.object({
    name: z.string().min(1, 'Titulo requerido'),
    description: z.string().min(1, 'Descripción requerida'),
    team_id: z.number().min(1,'Equipo requerido'),
    start_date: z.string(),
    end_date: z.string()
})

const idSchema = z.number().min(1, 'Id requerida')
export {addProjectSchema, idSchema}