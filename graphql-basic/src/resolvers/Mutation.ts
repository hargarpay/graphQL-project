import { v4 as uuidv4} from "uuid";
import { BlogType } from "../types/Blog";
import { CommentType } from "../types/Comment";
import { PostType } from "../types/Post";
import { UserType } from "../types/User";

export const Mutation = {
    createUser(parent: any, args: any, ctx: BlogType, info: any) {
        const emailTaken = ctx.users.some(u => u.email === args.user.email);

        if (emailTaken) throw new Error("Email taken");
        const user: UserType = {
            id: uuidv4(),
            ...args.user
        } 
        ctx.users.push(user);
        return user;
    },
    createPost(parent: any, args: any, ctx: BlogType, info: any){
        
        const userExist = ctx.users.some(u => u.id === args.post.author);

        if(!userExist) {
            throw new Error(`User with id '${args.post.author}' does not exist`);
        }

        const postTitleExist = ctx.posts.some(p => p.title === args.post.title);

        if(postTitleExist) {
            throw new Error(`Post with '${args.post.title}' title  already exist`);
        }

        const post: PostType = {
            id: uuidv4(),
            ...args.post
        } 

        ctx.posts.push(post);
        return post;
    },
    createComment(parent: any, args: any, ctx: BlogType, info: any){
        
        const userExist = ctx.users.some(u => u.id === args.comment.user);

        if(!userExist) {
            throw new Error(`User with id '${args.comment.user}' does not exist`);
        }

        const postExist = ctx.posts.some(p => p.id === args.comment.post && p.published);

        if(!postExist) {
            throw new Error(`Post with id '${args.comment.post}' does not exist`);
        }

        const comment: CommentType = {
            id: uuidv4(),
            ...args.comment
        } 

        ctx.comments.push(comment);
        return comment;
    },
    deleteComment(parent: any, args: any, ctx: BlogType, info: any){
        const comment = ctx.comments.find(c => c.id === args.id)
        if (!comment){
            throw new Error(`Comment with '${args.id}' id does not exist`);
        }

        ctx.comments = ctx.comments.filter(c => c.id !== args.id);
        return comment;
    },

    updateUser(parent: any, args: any, ctx: BlogType, info: any){
        const user = ctx.users.find(u => u.id === args.id);

        if(!user) throw new Error("User does not exist");

        if(typeof args.user.email === "string"){
            const userEmailExist = ctx.users.some(u => u.email === args.user.email);

            if(userEmailExist){
                throw new Error("Email Taken");
            }

            user.email = args.user.email;
        }

        if(typeof args.user.name === "string"){
            user.name = args.user.name;
        }

        if(typeof args.user.age !== "undefined"){
            user.age = args.user.age;
        }

        return user;
    },
    updatePost(parent: any, args: any, ctx: BlogType, info: any){
        const post = ctx.posts.find(p => p.id === args.id);

        if(!post) throw new Error("Post does not exist");

        if(typeof args.post.title === "string"){
            post.title = args.post.title;
        }

        if(typeof args.post.body === "string"){
            post.body = args.post.body;
        }

        if(typeof args.post.published === "boolean"){
            post.published = args.post.published;
        }

        return post;
    },
    updateComment(parent: any, args: any, ctx: BlogType, info: any){
        const comment = ctx.comments.find(c => c.id === args.id);

        if(!comment) throw new Error("Comment does not exist");

        if(typeof args.comment.text === "string"){
            comment.text = args.comment.text;
        }

        return comment;
    },
    deleteUser(parent: any, args: any, ctx: BlogType, info: any){
        const user = ctx.users.find(c => c.id === args.id)
        if (!user){
            throw new Error(`User with '${args.id}' id does not exist`);
        }

        ctx.comments = ctx.comments.filter(c => c.user !== args.id);
        ctx.posts = ctx.posts.filter(p => {
            const match = p.author === args.id;
            if(match){
                ctx.comments = ctx.comments.filter(c => c.post !== p.id)
            }
            return !match;
        });
        ctx.users = ctx.users.filter(u => u.id !== args.id);
        return user;

    },
    deletePost(parent:any, args: any, ctx: BlogType, info: any){
        const post = ctx.posts.find(p => p.id === args.id)
        if (!post){
            throw new Error(`Post with '${args.id}' id does not exist`);
        }
        ctx.comments = ctx.comments.filter(c => c.post !== args.id);
        ctx.posts = ctx.posts.filter(p => p.id !== args.id);

        return post;

    }
}