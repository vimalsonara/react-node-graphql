import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
  getCurrentLoggedInUser: async (_: any, __: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    } else {
      throw new Error("Not logged in");
    }
  },
  checkAuth: (_: any, __: any, context: any) => {
    if (context && context.user) {
      return { authenticated: true, user: context.user };
    } else {
      return { authenticated: false, user: null };
    }
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    try {
      await UserService.createUser(payload);

      return {
        success: true,
        message: "User created successfully",
      };
    } catch (error: any) {
      return { success: false, message: error.message, token: null };
    }
  },
  loginUser: async (
    _: any,
    payload: { email: string; password: string },
    context: any,
  ) => {
    try {
      const { token, user } = await UserService.loginUser(payload);
      if (context.res && typeof context.res.cookie === "function") {
        UserService.setTokenCookie(context.res, token);
      } else {
        console.log(
          "Unable to set cookie, res object or cookie method is unavailable",
        );
      }
      return { success: true, message: "Logged in successfully", user };
    } catch (error: any) {
      return { success: false, message: error.message, token: null };
    }
  },
};

export const resolvers = {
  queries,
  mutations,
};
