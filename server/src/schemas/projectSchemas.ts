import { z } from 'zod'

const addProjectSchema = z.object({
    name: z.string().min(1, 'Titulo requerido').min(3, 'Titulo de al menos 3 caracteres'),
    description: z.string().min(1, 'Descripción requerida').min(3, 'Descripción de al menos 3 caracteres'),
    // team_id: z.number().min(1,'Equipo requerido'),
    start_date: z.string().optional(),
    end_date: z.string().optional()
})

const idSchema = z.number().min(1, 'Id requerida')

const EmailSchema = z.object({
    email: z
      .string()
      .min(1, "Email required")
      .email("Invalid email")
      .max(150, "Max 150 characters"),
  });

export {addProjectSchema, idSchema , EmailSchema}