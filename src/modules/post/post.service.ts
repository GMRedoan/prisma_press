import { prisma } from "../../lib/prisma"
import { ICreatePost, IUpdatePostPayload } from "./post.interface"

const CreatePostInDB = async (payload: ICreatePost, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    })
    return result;
}

const getAllPostFromDB = async () => {
    const post = await prisma.post.findMany(
        {
            include: {
                author: {
                    omit: {
                        password: true
                    }
                },
                comments: true
            }
        }
    );
    return post;
}

const getAllStatsFromDB = () => {

}

const getMyPostsFromDB = async (authorId: string) => {
    const result = await prisma.post.findMany({
        where: {
           authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            _count: {
                select: {
                    comments: true
                }
            },
            comments: true
        },
    })

    return result;
}

const getPostsByIdFromDB = async (postId: string) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    const updatePostView = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            view: {
                increment: 1
            }
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })

    return updatePostView;
}

const updatePostsIdInDB = async (postId: string, payload: IUpdatePostPayload, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    if (post.authorId !== authorId && !isAdmin) {
        throw new Error("You are not allowed to update this post");
    }

    const result = await prisma.post.update({
        where: {
            id: postId
        },
        data: payload
     })
    return result
}

const deletePostsIdInDB = async (postId: string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    if (post.authorId !== authorId && !isAdmin) {
        throw new Error("You are not allowed to delete this post");
    }

    await prisma.post.delete({
        where: {
            id: postId
        }
     })
}

export const postService = {
    getAllPostFromDB,
    CreatePostInDB,
    getAllStatsFromDB,
    getMyPostsFromDB,
    getPostsByIdFromDB,
    updatePostsIdInDB,
    deletePostsIdInDB
}