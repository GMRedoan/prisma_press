import { prisma } from "../../lib/prisma"
import { ICreateCommentPayload, IModeratePayload, IUpdateComment } from "./comment.interface"

const getCommentsByAuthorIdFromDB = async (authorId: string) => { 
    const comments = await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include:{
            post:{
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })
    return comments;
}

const getCommentsByCommentIdFromDB = (commentId: string) => { 
    const comment = prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId
        }
    })
    return comment;
}

const createCommentIntoDB = async (authorId: string, payload: ICreateCommentPayload) => { 
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })
    const result = await prisma.comment.create({
        data: {
            ...payload,
            authorId
        }
    })
    return result;
}

const updateCommentIntoDB = async (commentId: string, data: IUpdateComment, authorId: string) => { 

    const result = await prisma.comment.update({
        where: {
            id: commentId,
            authorId
        },
        data
    })
    return result
}

const deleteCommentIntoDB = async (commentId : string, authorId: string) => { 
    await prisma.comment.delete({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    })
}

const moderateCommentIntoDB = async (commentId : string, data: IModeratePayload) => { 
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId
        },
        select: {
            id: true,
            status: true
        }
    })

    if(commentData.status === data.status){
        throw new Error("comment status is already up to date")
    }

    const updatedComment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data
    })
    return updatedComment;
}

export const commentService = {
    getCommentsByAuthorIdFromDB,
    getCommentsByCommentIdFromDB,
    createCommentIntoDB,
    updateCommentIntoDB,
    deleteCommentIntoDB,
    moderateCommentIntoDB
} 