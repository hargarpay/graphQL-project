export const User = `
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
`;

export type UserType = {
    id: string|number,
    name: string,
    email: string,
    age: number|null,
}