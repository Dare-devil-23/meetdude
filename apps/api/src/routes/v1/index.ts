import { Router } from "express";
import client from "@repo/db/client"
import { userRouter } from "./user";
import { adminRouter } from "./admin";
import { spaceRouter } from "./space";
import { SigninSchema, SignupSchema } from "../../types";
import { hash, compare } from "../../scrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

export const router = Router();

router.post("/signup", async (req, res) => {

    const parsedData = SignupSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        })
        return;
    }

    const hashedPassword = await hash(parsedData.data.password);

    try {
        const user = await client.user.create({
            data: {
                username: parsedData.data.username,
                password: hashedPassword,
                role: "User"
            }
        })

        res.json({
            userId: user.id
        })
    } catch (e) {
        res.status(400).json({
            message: "User already exists",
        })
    }
})

router.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Validation error",
        })
        return;
    }

    try {
        const user = await client.user.findUnique({
            where: {
                username: parsedData.data.username
            }, select: {
                id: true,
                password: true,
                role: true
            }
        })

        if (!user) {
            res.status(403).json({
                message: "User not found",
            })
            return;
        }
        const isValid = compare(parsedData.data.password, user.password);

        if (!isValid) {
            res.status(403).json({
                message: "Invalid password",
            })
            return;
        }

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, JWT_SECRET)

        res.json({
            token: token
        })
    } catch (e) {
        res.status(400).json({
            message: "Internal server error",
        })
    }
})

router.get("/elements", async (req, res) => {
    const elements = await client.element.findMany()
    res.json({
        elements: elements.map((e) => ({
            id: e.id,
            imageUrl: e.imageUrl,
            width: e.width,
            height: e.height,
            static: e.static
        }))
    })
})

router.get("/avatars", async (req, res) => {
    const avatars = await client.avatar.findMany()
    res.json({
        avatars: avatars.map((a) => ({
            id: a.id,
            imageUrl: a.imageUrl,
            name: a.name
        }))
    })
})

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/space", spaceRouter);