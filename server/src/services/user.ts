import { createHmac, randomBytes } from "crypto"
import { prisma } from "../lib/db"
import JWT from "jsonwebtoken"

export interface CreateUserPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginUserPayload {
  email: string
  password: string
}

export default class UserService {

  private static generateHash(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex")
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload
    const salt = randomBytes(32).toString('hex')
    const hashPassword = UserService.generateHash(salt, password)
    return prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashPassword
      }
    })
  }

  private static getUserByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  public static async loginUser(payload: LoginUserPayload) {
    const { email, password } = payload
    const user = await UserService.getUserByEmail(email)

    if (!user) {
      throw new Error("User not found")
    }

    const userSalt = user.salt
    const hashPassword = UserService.generateHash(userSalt, password)

    if (hashPassword !== user.password) {
      throw new Error("Invalid password")
    }

    const token = JWT.sign({ id: user.id, email }, process.env.JWT_SECRET as string)
    return token
  }
}
