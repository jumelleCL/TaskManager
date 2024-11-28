import { z } from 'zod'

const AddUserSchema = z.object({
    username: z
        .string()
        .min(1, 'Name required')
        .max(10, 'Max 10 characters'),
    email: z
        .string()
        .min(1, 'Email required')
        .email('Invalid email')
        .max(150, 'Max 150 characters'),
    password: z
        .string()
        .min(1, 'Password required')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password invalid')
        .max(16, 'Max 16 characters'),
});

const LoginSchema = z.object({
    username: z
        .string()
        .min(1, 'Name required')
        .max(50, 'Max 50 characters'),
    password: z
        .string()
        .min(1, 'Password required')
        .max(16, 'Max 16')
})

export { AddUserSchema , LoginSchema}