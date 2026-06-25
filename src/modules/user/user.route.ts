import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from "http-status";

const router = Router();

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                name: string;
                email: string;
                role: string;
            }
        }
    }
}

router.get("/", userController.getAllUsers);

router.get("/me", (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    const verifyToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);

    if (typeof verifyToken === "string") {
        throw new Error(verifyToken);
    }

    const {id,name, email, role} = verifyToken;
    const requiredRole = [Role.ADMIN, Role.USER, Role.AUTHOR];

    if (!requiredRole.includes(role)) {
        return res.status(403).json({
            success: false,
            statusCode: httpStatus.FORBIDDEN,
            message: "You are not allowed to access this route",
        })
    }
    req.user = {
        id, name, email, role
    }
 next();
},
    userController.getMyProfile);

export const userRouter = router;