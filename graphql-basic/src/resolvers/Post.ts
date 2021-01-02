import { BlogType } from "../types/Blog"
import { PostType } from "../types/Post"

export const Post = {
    author(parent: PostType, args: any, ctx: BlogType, info: any){
        return ctx.users.find(u => u.id === parent.author)
    },
    comments(parent: PostType, args: any, ctx: BlogType, info: any){
        return ctx.comments.filter(c => c.post === parent.id)
    }
}