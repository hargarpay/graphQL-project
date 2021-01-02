import { ContextType } from "../types/Context";

export const Subscription = {
    count: {
        subscribe(parent: any, args: any, ctx: ContextType, info: any){
            let count = 0;
            setInterval(() => {
                count++;
                ctx.pubsub.publish("count", {
                    count
                })
            }, 1500)
            return ctx.pubsub.asyncIterator("count");
        }
    },
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
    }
}