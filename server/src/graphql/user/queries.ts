export const queries = `#graphql
  getUserToken(email: String!, password: String!): AuthResponse!
  getCurrentLoggedInUser: User
  checkAuth: AuthStatus!
`;
