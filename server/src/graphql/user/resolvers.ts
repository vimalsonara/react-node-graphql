import UserService, { CreateUserPayload } from "../../services/user"

const queries = {
  getUserToken: async (_: any, payload: { email: string, password: string }) => {
    const token = await UserService.loginUser(payload)
    return token
  },
  getCurrentLoggedInUser: async (_: any, __: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id
      const user = await UserService.getUserById(id)
      return user
    } else {
      throw new Error("Not logged in")
    }
  }
}

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const user = await UserService.createUser(payload)
    return user.id
  }
}

export const resolvers = {
  queries,
  mutations,
}
