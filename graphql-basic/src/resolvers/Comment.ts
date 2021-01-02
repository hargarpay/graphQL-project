import { BlogType } from "../types/Blog"
import { CommentType } from "../types/Comment"

export const Comment = {
    post(parent: CommentType, args: any, ctx: BlogType, info: any ){
        return ctx.posts.find(p => p.id === parent.post)
    },
    user(parent: CommentType, args: any, ctx: BlogType, info: any){
        return ctx.users.find(u => u.id === parent.user)
    },
}