import { BlogType } from "../types/Blog";
import { PostType } from "../types/Post";

export const Query = {
    users(parent: any, args: any, ctx: BlogType, info: any){
        if (args.email){
            return ctx.users.filter((u) => u.email.toLowerCase().indexOf(args.email.toLowerCase()) > -1);
        }

        if (args.name){
            return ctx.users.filter((u) => u.name.toLowerCase() === args.name.toLowerCase());
        }

        return ctx.users;

    },
    posts(parent: any, args: any, ctx: BlogType, info: any): PostType[]{
        if(args.query){
            const q2Lower = args.query.toLowerCase();
            return ctx.posts.filter((p) => (
                p.body.toLowerCase().includes(q2Lower) ||
                p.title.toLowerCase().includes(q2Lower)
            ))
        }
        return ctx.posts;
    },
    comments(parent: any, args: any, ctx: BlogType, info: any){
        return ctx.comments
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

