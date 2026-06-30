import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
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
        //     where: {
        //     title: "my fourth post"
        // },
        // where:{
        //     AND: [
        //         {
        //             title: "my fourth post"
        //         },
        //     ]
        // },
        // search filtering
        where:{
            title:{
                contains: "poSt",
                mode: "insensitive"
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
        } 
    );
    return post;
}
 
const getAllStatsFromDB = async () => {
    const transactionResult = await prisma.$transaction(
        async (tx) => {
             const [
                totalPost,
                totalPublishedPost,
                totalDraftPost,
                totalArchivedPost,
                totalComment,
                totalApprovedComment,
                totalRejectComment,
                 totalPostViewsAggregate
            ] = await Promise.all([
                await tx.post.count(),
                await tx.post.count({
                    where: {
                        status: PostStatus.PUBLISHED
                    }
                }),
                await tx.post.count({
                    where: {
                        status: PostStatus.DRAFT
                    }
                }),
                await tx.post.count({
                    where: {
                        status: PostStatus.ARCHIVED
                    }
                }),
                await tx.comment.count(),
                await tx.comment.count({
                    where: {
                        status: CommentStatus.APPROVED
                    }
                }),
                await tx.comment.count({
                    where: {
                        status: CommentStatus.REJECT
                    }
                }),
                await tx.post.aggregate({
                    _sum: {
                        view: true
                    }
                })
            ])

            return {
                totalPost,
                totalPublishedPost,
                totalDraftPost,
                totalArchivedPost,
                totalComment,
                totalApprovedComment,
                totalRejectComment,
                totalPostViews : totalPostViewsAggregate._sum.view
            }
        }
    )
    return transactionResult;
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

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            await tx.post.update({
                where: {
                    id: postId
                },
                data: {
                    view: {
                        increment: 1
                    }
                }
            })
            const post = await tx.post.findUniqueOrThrow({
                where: {
                    id: postId
                },
                include: {
                    author: {
                        omit: {
                            password: true
                        }
                    },
                    comments: {
                        where: {
                            status: CommentStatus.APPROVED
                        },
                        orderBy: {
                            createdAt: "desc"
                        }
                    }
                }
            });

            return post;
        }
    )

    return transactionResult
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