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
    user: User
  }

  type AuthStatus {
    authenticated: Boolean!
    user: User
  }
`;
