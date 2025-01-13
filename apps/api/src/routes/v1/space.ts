import { Router } from "express";
import { AddElementSchema, CreateSpaceSchema, DeleteElementSchema } from "../../types";
import client from "@repo/db/client"
import { userMiddleware } from "../../middleWare/user";

export const spaceRouter = Router();

spaceRouter.delete("/element", userMiddleware, async (req, res) => {
    const parsedData = DeleteElementSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        })
        return;
    }

    const spaceElement = await client.spaceElements.findUnique({
        where: {
            id: parsedData.data.id
        }, include: {
            space: true
        }
    })

    if (!spaceElement?.space.creatorId || spaceElement.space.creatorId !== req.userId) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return;
    }

    await client.spaceElements.delete({
        where: {
            id: parsedData.data.id
        }
    })

    res.status(200).json({
        message: "Element deleted"
    })

})

spaceRouter.post("/", userMiddleware, async (req, res) => {
    const parsedData = CreateSpaceSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        })
        return;
    }

    if (!parsedData.data.mapId) {
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: parseInt(parsedData.data.dimensions.split("x")[0]),
                height: parseInt(parsedData.data.dimensions.split("x")[1]),
                thumbnail: parsedData.data.thumbnail,
                creatorId: req.userId
            }
        })

        res.json({
            spaceId: space.id
        })
        return;
    }

    const map = await client.map.findFirst({
        where: {
            id: parsedData.data.mapId
        }, select: {
            mapElements: true,
            width: true,
            height: true,
            thumbnail: true
        }
    })

    if (!map) {
        res.status(400).json({
            message: "Map not found",
        })
        return;
    }

    try {
        let space = await client.$transaction(async () => {
            const space = await client.space.create({
                data: {
                    name: parsedData.data.name,
                    width: map.width,
                    height: map.height,
                    thumbnail: map.thumbnail,
                    creatorId: req.userId
                }
            })

            await client.spaceElements.createMany({
                data: map.mapElements.map((e) => {
                    return {
                        elementId: e.elementId,
                        spaceId: space.id,
                        x: e.x!,
                        y: e.y!
                    }
                })
            })

            return space;
        })

        res.status(200).json({
            spaceId: space.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

spaceRouter.delete("/:spaceId", userMiddleware, async (req, res) => {
    const space = await client.space.findFirst({
        where: {
            id: req.params.spaceId
        },
        select: {
            creatorId: true
        }
    });

    if (!space) {
        res.status(404).json({
            message: "Space not found"
        });
        return;
    }

    if (space.creatorId !== req.userId) {
        res.status(403).json({
            message: "Unauthorized"
        });
        return;
    }

    try {
        // Delete related SpaceElements first
        await client.spaceElements.deleteMany({
            where: {
                spaceId: req.params.spaceId
            }
        });

        // Then delete the Space
        await client.space.delete({
            where: {
                id: req.params.spaceId
            }
        });

        res.status(200).json({
            message: "Space and related elements deleted"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while deleting the Space"
        });
    }
});


spaceRouter.get("/all", userMiddleware, async (req, res) => {
    const spaces = await client.space.findMany({
        where: {
            creatorId: req.userId
        }
    })

    res.json({
        spaces: spaces.map((space) => {
            return {
                id: space.id,
                name: space.name,
                thumbnail: space.thumbnail,
                dimensions: `${space.width}x${space.height}`
            }
        })
    })
})

spaceRouter.get("/maps", userMiddleware, async (_, res) => {
    const maps = await client.map.findMany()
    res.json({
        maps: maps.map((m) => ({
            id: m.id,
            name: m.name,
            thumbnail: m.thumbnail,
            dimensions: `${m.width}x${m.height}`
        }))
    })
})

spaceRouter.post("/element", userMiddleware, async (req, res) => {
    const parsedData = AddElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        })
        return;
    }

    const space = await client.space.findUnique({
        where: {
            id: parsedData.data.spaceId,
            creatorId: req.userId
        }, select: {
            width: true,
            height: true
        }
    })

    if (req.body.x < 0 || req.body.x > space?.width! || req.body.y < 0 || req.body.y > space?.height!) {
        res.status(400).json({
            message: "Invalid position"
        })
        return;
    }

    if (!space) {
        res.status(400).json({
            message: "Space not found",
        })
        return;
    }

    await client.spaceElements.create({
        data: {
            elementId: parsedData.data.elementId,
            spaceId: parsedData.data.spaceId,
            x: parsedData.data.x,
            y: parsedData.data.y
        }
    })

    res.status(200).json({
        message: "Element added"
    })
})

spaceRouter.get("/:spaceId", userMiddleware, async (req, res) => {
    const space = await client.space.findUnique({
        where: {
            id: req.params.spaceId
        },
        include: {
            elements: {
                include: {
                    element: true
                }
            }
        }
    })

    if (!space) {
        res.status(400).json({
            message: "Space not found",
        })
        return;
    }

    res.json({
        dimensions: `${space.width}x${space.height}`,
        elements: space.elements.map((e) => ({
            id: e.id,
            element: {
                id: e.element.id,
                imageUrl: e.element.imageUrl,
                width: e.element.width,
                height: e.element.height,
                static: e.element.static
            },
            x: e.x,
            y: e.y
        }))
    })
})