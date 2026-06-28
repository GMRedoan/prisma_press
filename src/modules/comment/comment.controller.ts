import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"

const getCommentsByAuthorId = catchAsync(async (req: Request, res: Response) => {
    
})

const getCommentsByCommentId = catchAsync(async (req: Request, res: Response) => {
    
})

const createComment = catchAsync(async (req: Request, res: Response) => {
    
})

const updateComment = catchAsync(async (req: Request, res: Response) => {
    
})

const deleteComment = catchAsync(async (req: Request, res: Response) => {
    
})

const moderateComment = catchAsync(async (req: Request, res: Response) => {
    
})

export const commentController = {
    getCommentsByAuthorId,
    getCommentsByCommentId,
    createComment,
    updateComment,
    deleteComment,
    moderateComment
}