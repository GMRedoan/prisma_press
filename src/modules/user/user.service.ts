import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { IUser } from "./user.interface";

const getAllUserFromDB = async () => {
    const users = await prisma.user.findMany({
        include: {
            profile: true
        }
    });
    return users
}

const registerUserIntoDB = async (payload:IUser) => {
    const { name, email, password, profilePhoto } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (isUserExist) {
       throw new Error("user already exist");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    await prisma.profile.create({
        data: {
            profilePhoto,
            userId: createdUser.id
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email
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
    registerUserIntoDB,
    getAllUserFromDB
}