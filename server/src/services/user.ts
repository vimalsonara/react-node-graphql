import { createHmac, randomBytes } from "crypto";
import { Response } from "express";
import { prisma } from "../lib/db";
import JWT from "jsonwebtoken";

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export default class UserService {
  private static generateHash(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString("hex");
    const hashPassword = UserService.generateHash(salt, password);
    return prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashPassword,
      },
    });
  }

  private static getUserByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  public static async getUserById(id: string) {
    return prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  public static async loginUser(payload: LoginUserPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const userSalt = user.salt;
    const hashPassword = UserService.generateHash(userSalt, password);

    if (hashPassword !== user.password) {
      throw new Error("Invalid password");
    }

    const token = JWT.sign(
      { id: user.id, email },
      process.env.JWT_SECRET as string,
    );
    return { token, user };
  }

  public static decodeToken(token: string) {
    return JWT.verify(token, process.env.JWT_SECRET as string);
  }

  public static setTokenCookie(res: Response, token: string) {
    try {
      if (res && typeof res.cookie === "function") {
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 30,
          sameSite: "strict",
        });
      } else {
        console.log("Unable to set cookie object is invalid");
      }
    } catch (error) {
      console.log("Error setting cookie:", error);
    }
  }
}
