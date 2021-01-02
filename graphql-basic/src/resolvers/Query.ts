import { ContextType } from "../types/Context";
import { PostType } from "../types/Post";

export const Query = {
    users(parent: any, args: any, ctx: ContextType, info: any){
        if (args.email){
            return ctx.db.users.filter((u) => u.email.toLowerCase().indexOf(args.email.toLowerCase()) > -1);
        }

        if (args.name){
            return ctx.db.users.filter((u) => u.name.toLowerCase() === args.name.toLowerCase());
        }

        return ctx.db.users;

    },
    posts(parent: any, args: any, ctx: ContextType, info: any): PostType[]{
        if(args.query){
            const q2Lower = args.query.toLowerCase();
            return ctx.db.posts.filter((p) => (
                p.body.toLowerCase().includes(q2Lower) ||
                p.title.toLowerCase().includes(q2Lower)
            ))
        }
        return ctx.db.posts;
    },
    comments(parent: any, args: any, ctx: ContextType, info: any){
        return ctx.db.comments
    },
    me(){
        return {
            id: 12345,
            name: "John Doe",
            email: "johndoe@sagedevs.com",
            age: 30,
        }
    },
    post(){
        return {
            id: 234,
            title: "THe beauty of Git Hooks",
            body: "Git hooks are really beautiful. It uses event driven pattern",
            published: true
        }
    }
}

