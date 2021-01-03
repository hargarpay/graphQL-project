import { v4 as uuidv4} from "uuid";
import { BlogType } from "../types/Blog";
import { CommentType } from "../types/Comment";
import { ContextType } from "../types/Context";
import { PostType } from "../types/Post";
import { UserType } from "../types/User";

export const Mutation = {
    createUser(parent: any, args: any, ctx: ContextType, info: any) {
        const emailTaken = ctx.db.users.some(u => u.email === args.user.email);

        if (emailTaken) throw new Error("Email taken");
        const user: UserType = {
            id: uuidv4(),
            ...args.user
        } 
        ctx.db.users.push(user);
        return user;
    },
    createPost(parent: any, args: any, ctx: ContextType, info: any){
        
        const userExist = ctx.db.users.some(u => u.id === args.post.author);

        if(!userExist) {
            throw new Error(`User with id '${args.post.author}' does not exist`);
        }

        const postTitleExist = ctx.db.posts.some(p => p.title === args.post.title);

        if(postTitleExist) {
            throw new Error(`Post with '${args.post.title}' title  already exist`);
        }

        const post: PostType = {
            id: uuidv4(),
            ...args.post
        } 

        ctx.db.posts.push(post);
        if(post.published){
            ctx.pubsub.publish("post", {
                post: {
                    mutation: "CREATED",
                    data: post
                }
            })
        }
        return post;
    },
    createComment(parent: any, args: any, ctx: ContextType, info: any){
        
        const userExist = ctx.db.users.some(u => u.id === args.comment.user);

        if(!userExist) {
            throw new Error(`User with id '${args.comment.user}' does not exist`);
        }

        const postExist = ctx.db.posts.some(p => p.id === args.comment.post && p.published);

        if(!postExist) {
            throw new Error(`Post with id '${args.comment.post}' does not exist`);
        }

        const comment: CommentType = {
            id: uuidv4(),
            ...args.comment
        } 

        ctx.db.comments.push(comment);
        ctx.pubsub.publish(`comment:${args.comment.post}`, {
            comment: {
                mutation: "CREATED",
                data: comment
            }
        })
        return comment;
    },
    deleteComment(parent: any, args: any, ctx: ContextType, info: any){
        const comment = ctx.db.comments.find(c => c.id === args.id)
        if (!comment){
            throw new Error(`Comment with '${args.id}' id does not exist`);
        }

        ctx.db.comments = ctx.db.comments.filter(c => c.id !== args.id);

        ctx.pubsub.publish(`comment:${args.comment.post}`, {
            comment: {
                mutation: "DELETED",
                data: comment
            }
        })
        return comment;
    },

    updateUser(parent: any, args: any, ctx: ContextType, info: any){
        const user = ctx.db.users.find(u => u.id === args.id);

        if(!user) throw new Error("User does not exist");

        if(typeof args.user.email === "string"){
            const userEmailExist = ctx.db.users.some(u => u.email === args.user.email);

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
    updatePost(parent: any, args: any, ctx: ContextType, info: any){
        const post = ctx.db.posts.find(p => p.id === args.id);

        const previousPost = {...post};

        if(!post) throw new Error("Post does not exist");

        if(typeof args.post.title === "string"){
            post.title = args.post.title;
        }

        if(typeof args.post.body === "string"){
            post.body = args.post.body;
        }

        if(typeof args.post.published === "boolean"){
            post.published = args.post.published;

            if(!previousPost.published && post.published){
                ctx.pubsub.publish("post", {
                    post: {
                        mutation: "CREATED",
                        data: post
                    }
                })
            }else if (previousPost.published && post.published){
                ctx.pubsub.publish("post", {
                    post: {
                        mutation: "DELETED",
                        data: post
                    }
                })
            }
        }else if (previousPost.published) {
            ctx.pubsub.publish("post", {
                post: {
                    mutation: "UPDATED",
                    data: post
                }
            })
        }

        return post;
    },
    updateComment(parent: any, args: any, ctx: ContextType, info: any){
        const comment = ctx.db.comments.find(c => c.id === args.id);

        if(!comment) throw new Error("Comment does not exist");

        if(typeof args.comment.text === "string"){
            comment.text = args.comment.text;
        }

        ctx.pubsub.publish(`comment:${args.comment.post}`, {
            comment: {
                mutation: "UPDATED",
                data: comment
            }
        })
        return comment;
    },
    deleteUser(parent: any, args: any, ctx: ContextType, info: any){
        const user = ctx.db.users.find(c => c.id === args.id)
        if (!user){
            throw new Error(`User with '${args.id}' id does not exist`);
        }

        ctx.db.comments = ctx.db.comments.filter(c => c.user !== args.id);
        ctx.db.posts = ctx.db.posts.filter(p => {
            const match = p.author === args.id;
            if(match){
                ctx.db.comments = ctx.db.comments.filter(c => c.post !== p.id)
            }
            return !match;
        });
        ctx.db.users = ctx.db.users.filter(u => u.id !== args.id);
        return user;

    },
    deletePost(parent:any, args: any, ctx: ContextType, info: any){
        const post = ctx.db.posts.find(p => p.id === args.id)
        if (!post){
            throw new Error(`Post with '${args.id}' id does not exist`);
        }
        ctx.db.comments = ctx.db.comments.filter(c => c.post !== args.id);
        ctx.db.posts = ctx.db.posts.filter(p => p.id !== args.id);

        ctx.pubsub.publish("post", {
            post: {
                mutation: "DELETED",
                data: post
            }
        })

        return post;

    }
}