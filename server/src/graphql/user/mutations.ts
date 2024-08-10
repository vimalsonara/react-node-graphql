export const mutations = `#graphql
  createUser(firstName: String!, lastName: String!, email: String!, password: String!): AuthResponse! 
  loginUser(email: String!, password: String!): AuthResponse!
`;
