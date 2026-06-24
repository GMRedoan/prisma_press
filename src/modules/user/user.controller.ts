import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUserFromDB();
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "users retrieved successfully",
            data: { users }
        })
    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "failed to retrieve users",
            error: error.message
        });
    }}

const registerUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const user = await userService.registerUserIntoDB(payload);

        res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            message: "user registered successfully",
            data: { user }
        })

    } catch (error: any) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "failed to register user",
            error: error.message
        });
    }
}

export const userController = {
    registerUser,
    getAllUsers
}