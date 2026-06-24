import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import { ILoginUser, IUser } from "./auth.interface";

const registerUserIntoDB = async (payload: IUser) => {
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
            profile: {
                create: {
                    profilePhoto
                }
            }
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

const loginUser = async ( payload: ILoginUser ) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        },
        include: {
            profile: true
        }
    })

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("invalid password");
    }

    return user
}

export const authService = {
    registerUserIntoDB,
    loginUser
}