import { Router } from "express";
import { adminMiddleware } from "../../middleWare/admin";
import { CreateAvatarSchema, CreateElementSchema, CreateMapSchema, UpdateElementSchema, UpdateUserRoleSchema } from "../../types";
import client from "@repo/db/client"

export const adminRouter = Router();
adminRouter.use(adminMiddleware)

adminRouter.post("/element", async (req, res) => {
    const parsedData = CreateElementSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        })
        return;
    }

    const element = await client.element.create({
        data: {
            imageUrl: parsedData.data.imageUrl,
            width: parsedData.data.width,
            height: parsedData.data.height,
            static: parsedData.data.static
        }
    })

    res.status(200).json({
        id: element.id
    })
})

adminRouter.put("/element/:elementId", async (req, res) => {
    const parsedData = UpdateElementSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        })
        return;
    }

    await client.element.update({
        where: {
            id: req.params.elementId
        },
        data: {
            imageUrl: parsedData.data.imageUrl,
        }
    })

    res.json({
        message: "Element updated"
    })
})

adminRouter.post("/avatar", async (req, res) => {
    const parsedData = CreateAvatarSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        })
        return;
    }

    const avatar = await client.avatar.create({
        data: {
            imageUrl: parsedData.data.imageUrl,
            name: parsedData.data.name
        }
    })

    res.json({
        id: avatar.id
    })
})

adminRouter.post("/map", async (req, res) => {
    const parsedData = CreateMapSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        })
        return;
    }

    const map = await client.map.create({
        data: {
            name: parsedData.data.name,
            width: parseInt(parsedData.data.dimensions.split("x")[0]),
            height: parseInt(parsedData.data.dimensions.split("x")[1]),
            thumbnail: parsedData.data.thumbnail,
            mapElements: {
                createMany: {
                    data: parsedData.data.defaultElements.map((element) => {
                        return {
                            x: element.x,
                            y: element.y,
                            elementId: element.elementId
                        }
                    })
                }
            }
        }
    })

    res.json({
        id: map.id
    })
})

adminRouter.get("/users", async (req, res) => {
    const users = await client.user.findMany({
        where: {
            id: {
                not: req.userId
            }
        },
        select: {
            id: true,
            username: true,
            role: true,
            email: true,
            avatar: true
        },
        orderBy: {
            username: "asc"
        }
    })
    res.json(users)
})

adminRouter.put("/user/:userId/role", async (req, res) => {
    const parsedData = UpdateUserRoleSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        });
        return;
    }

    if (req.userId === req.params.userId) {
        res.status(403).json({
            message: "You are not allowed to update your own role",
        });
        return;
    }

    try {
        const existingUser = await client.user.findUnique({
            where: { id: req.params.userId },
        });

        if (!existingUser) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }

        const updatedUser = await client.user.update({
            where: { id: existingUser.id },
            data: {
                role: parsedData.data.type === "admin" ? "Admin" : "User",
            },
        });

        res.json({
            message: "User role updated",
            role: updatedUser.role,
            id: updatedUser.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});