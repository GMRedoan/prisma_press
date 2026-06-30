import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { commentService } from "./comment.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status"

const getCommentsByAuthorId = catchAsync(async (req: Request, res: Response) => {
    const authorId = req.params.authorId
    if(!authorId){
        throw new Error("user id is required")
    }

    const result = await commentService.getCommentsByAuthorIdFromDB(authorId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "comments retrieved successfully",
        data: result
    })
})

const getCommentsByCommentId = catchAsync(async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    if(!commentId){
        throw new Error("comment id is required")
    }
    const result = await commentService.getCommentsByCommentIdFromDB(commentId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "comment retrieved successfully",
        data: result
    })
})

const createComment = catchAsync(async (req: Request, res: Response) => {
    const authorId = req.user?.id
    const payload = req.body

    if(!authorId){
        throw new Error("user id is required")
    }
    const result = await commentService.createCommentIntoDB(authorId as string, payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "comment created successfully",
        data: result
    })
})

const updateComment = catchAsync(async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    const authorId = req.user?.id
    const data = req.body

    if(!commentId){
        throw new Error("comment id is required")
    }
    if(!authorId){
        throw new Error("user id is required")
    }
    const result = await commentService.updateCommentIntoDB(commentId as string, data, authorId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "comment updated successfully",
        data: result
    })
})

const deleteComment = catchAsync(async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    const authorId = req.user?.id

    if(!commentId){
        throw new Error("comment id is required")
    }
    if(!authorId){
        throw new Error("user id is required")
    }
    await commentService.deleteCommentIntoDB(commentId as string, authorId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "comment deleted successfully",
        data: null
    })
})

const moderateComment = catchAsync(async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    const data = req.body

    if(!commentId){
        throw new Error("comment id is required")
    }
    const result = await commentService.moderateCommentIntoDB(commentId as string, data)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "comment moderated successfully",
        data: result
    })
})

export const commentController = {
    getCommentsByAuthorId,
    getCommentsByCommentId,
    createComment,
    updateComment,
    deleteComment,
    moderateComment
} 