import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) { 
            // res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            //     success: false,
            //     statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            //     message: "something went wrong",
            //     error: error.message
            // });
            next(error);
        }
    }
}
