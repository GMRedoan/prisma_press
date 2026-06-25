import { prisma } from "../../lib/prisma";

const getAllUserFromDB = async () => {
    const users = await prisma.user.findMany({
        include: {
            profile: true
        }
    });
    return users
}

const getMyProfileFromDB = async (userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    });

    return user;
}

export const userService = {
    getAllUserFromDB,
    getMyProfileFromDB
}