import { CommentType } from "../types/Comment"
import { ContextType } from "../types/Context"

export const Comment = {
    post(parent: CommentType, args: any, ctx: ContextType, info: any ){
        return ctx.db.posts.find(p => p.id === parent.post)
    },
    user(parent: CommentType, args: any, ctx: ContextType, info: any){
        return ctx.db.users.find(u => u.id === parent.user)
    },
}