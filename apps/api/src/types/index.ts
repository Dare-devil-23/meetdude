import z from "zod"

export const SignupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export const SigninSchema = z.object({
    usernameOrEmail: z.string(),
    password: z.string()
})

export const UpdateMetadataSchema = z.object({
    avatarId: z.string()
})

export const CreateSpaceSchema = z.object({
    name: z.string(),
    dimensions: z.string().regex(/^[0-9]{1,5}x[0-9]{1,5}$/),
    mapId: z.string().optional(),
    thumbnail: z.string().optional()
})

export const AddElementSchema = z.object({
    elementId: z.string(),
    spaceId: z.string(),
    x: z.number(),
    y: z.number()
})

export const DeleteElementSchema = z.object({
    id: z.string()
})

export const CreateElementSchema = z.object({
    imageUrl: z.string(),
    width: z.number(),
    height: z.number(),
    static: z.boolean()
})

export const UpdateElementSchema = z.object({
    imageUrl: z.string(),
})

export const UpdateUserRoleSchema = z.object({
    type: z.enum(["user", "admin"])
})

export const CreateAvatarSchema = z.object({
    imageUrl: z.string(),
    name: z.string()
})

export const CreateMapSchema = z.object({
    thumbnail: z.string(),
    name: z.string(),
    dimensions: z.string().regex(/^[0-9]{1,5}x[0-9]{1,5}$/),
    defaultElements: z.array(z.object({
        elementId: z.string(),
        x: z.number(),
        y: z.number()
    }))
})

declare global {
    namespace Express {
        export interface Request {
            userId: string;
        }
    }
}