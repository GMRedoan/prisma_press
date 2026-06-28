import { prisma } from "../../lib/prisma"
import { ICreatePost } from "./post.interface"

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

const updatePostsIdInDB = () => {

}

const deletePostsIdInDB = () => {

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