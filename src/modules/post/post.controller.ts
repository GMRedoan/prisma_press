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
    const result = await postService.getAllPostFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "all posts retrieved successfully",
        data: result 
    })
})


const getAllStats = catchAsync(async (req: Request, res: Response) => {

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

})

const deletePostsId = catchAsync(async (req: Request, res: Response) => {

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