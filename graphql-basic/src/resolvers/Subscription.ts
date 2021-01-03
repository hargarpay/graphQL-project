import { ContextType } from "../types/Context";

export const Subscription = {
    comment: {
        subscribe(parent: any, args: any, ctx: ContextType, info: any){
            const postExist = ctx.db.posts.some(p => (
                (p.id === args.post) && p.published
            ));

            if(!postExist){
                throw new Error("Either post does not exist or not publish");
            }

            return ctx.pubsub.asyncIterator(`comment:${args.post}`);
        }
    },
    post: {
        subscribe(parent: any, args: any, ctx: ContextType, info: any){

            return ctx.pubsub.asyncIterator("post");
        }
    },
}