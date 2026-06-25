import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUserFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "users retrieved successfully",
        data: { users }
    })})

    const getMyProfile = catchAsync(async (req: Request, res: Response) => {
        const profile = await userService.getMyProfileFromDB(req.user.id);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "user profile retrieved successfully",
            data: { profile }
        })

    })

export const userController = {
    getAllUsers,
    getMyProfile
}