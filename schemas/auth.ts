import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(5).max(30)
})


export type LoginInfo = z.infer<typeof loginSchema>