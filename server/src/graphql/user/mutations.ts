export const mutations = `#graphql
  createUser(firstName: String!, lastName: String!, email: String!, password: String!): AuthResponse! 
  getUserToken(email: String!, password: String!): AuthResponse!
`;
