export const Comment = `
    type Comment {
        id: ID!,
        text: String!
        user: User!
        post: Post!
    }
`

export type CommentType = {
    id:  string|number,
    text: string,
    user?: string|number
    post?: string|number
}