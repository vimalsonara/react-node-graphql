export const typeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profileImageURL: String
  }

  type AuthResponse {
    success: Boolean!
    message: String
    token: String
  }

  type AuthStatus {
    authenticated: Boolean!
    user: User
  }
`;
