import { BlogType } from "../types/Blog"
import { UserType } from "../types/User"

export const User = {
    posts(parent: UserType, args: any, ctx: BlogType, info: any){
        return ctx.posts.filter(p => p.author === parent.id)
    },
    comments(parent: UserType, args: any, ctx: BlogType, info: any){
        return ctx.comments.filter(c => c.user === parent.id)
    }
}