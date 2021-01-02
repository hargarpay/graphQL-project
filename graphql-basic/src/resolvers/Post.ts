import { ContextType } from "../types/Context"
import { PostType } from "../types/Post"

export const Post = {
    author(parent: PostType, args: any, ctx: ContextType, info: any){
        return ctx.db.users.find(u => u.id === parent.author)
    },
    comments(parent: PostType, args: any, ctx: ContextType, info: any){
        return ctx.db.comments.filter(c => c.post === parent.id)
    }
}