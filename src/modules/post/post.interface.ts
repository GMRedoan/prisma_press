import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePost {
    title : string,
    content : string,
    thumbnail ?: string,
    isFeatured ?: boolean,
    status ?: PostStatus,
    tags : string[],
    view ?: number
}

export interface IUpdatePostPayload {
    title ?: string,
    content ?: string,
    thumbnail ?: string,
    isFeatured ?: boolean,
    status ?: PostStatus,
    tags ?: string[],
    view ?: number
}