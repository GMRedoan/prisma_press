import { prisma } from "../../lib/prisma";

const getAllUserFromDB = async () => {
    const users = await prisma.user.findMany({
        include: {
            profile: true
        }
    });
    return users
}


export const userService = {
    getAllUserFromDB
}