import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPost = catchAsync(async (req: Request, res: Response) => {
    const id = req.user?.id
    const payload = req.body;

    const result = await postService.CreatePostInDB(payload, id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "post created successfully",
        data: result 
    })
})

const getAllPosts =  catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await postService.getAllPostFromDB(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "all posts retrieved successfully",
        data: result 
    })
})


const getAllStats = catchAsync(async (req: Request, res: Response) => {
    const result = await postService.getAllStatsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "stats retrieved successfully",
        data: result 
    })
})

const getMyPosts = catchAsync(async (req: Request, res: Response) => {
    const authorId = req.user?.id;
    if (!authorId){
        throw new Error("user id is required")
    }
    const result = await postService.getMyPostsFromDB(authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "my posts retrieved successfully",
        data: result 
    })
})

const getPostsById = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.postId;

    if (!postId){
        throw new Error("post id is required")
    }
    const result = await postService.getPostsByIdFromDB(postId as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "post retrieved successfully",
        data: result 
    })
})

const updatePostsId = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const payload = req.body;
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    if (!postId){
        throw new Error("post id is required")
    }
    const result = await postService.updatePostsIdInDB(postId as string, payload, authorId as string, isAdmin);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "post updated successfully",
        data: result 
    })
})

const deletePostsId = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    if (!postId){
        throw new Error("post id is required")
    }
    await postService.deletePostsIdInDB(postId as string, authorId as string, isAdmin);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "post deleted successfully",
        data: null 
    })
})

export const postController = {
    getAllPosts,
    createPost,
    getAllStats,
    getMyPosts,
    getPostsById,
    updatePostsId,
    deletePostsId
}