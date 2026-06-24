import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await authService.registerUserIntoDB(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "user registered successfully",
        data: { user }
    })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await authService.loginUser(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user logged in successfully",
        data: { user }
    })
})

export const authController = {
    registerUser,
    loginUser
}