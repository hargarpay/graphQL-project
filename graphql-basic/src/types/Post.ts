export const Post = `
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
`;

export type PostType = {
    id: string|number,
    title: string,
    body: string,
    published: boolean,
    author?: number|string
}