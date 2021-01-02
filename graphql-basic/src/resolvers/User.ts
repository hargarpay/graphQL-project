import { ContextType } from "../types/Context"
import { UserType } from "../types/User"

export const User = {
    posts(parent: UserType, args: any, ctx: ContextType, info: any){
        return ctx.db.posts.filter(p => p.author === parent.id)
    },
    comments(parent: UserType, args: any, ctx: ContextType, info: any){
        return ctx.db.comments.filter(c => c.user === parent.id)
    }
}