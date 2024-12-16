import { z } from 'zod'

const addProjectSchema = z.object({
    name: z.string().min(1, 'Titulo requerido').min(3, 'Titulo de al menos 3 caracteres'),
    description: z.string().min(1, 'Descripción requerida').min(3, 'Descripción de al menos 3 caracteres'),
    // team_id: z.number().min(1,'Equipo requerido'),
    start_date: z.string(),
    end_date: z.string()
})

const idSchema = z.number().min(1, 'Id requerida')
export {addProjectSchema, idSchema}