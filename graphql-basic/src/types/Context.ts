import { PubSub } from "graphql-yoga";
import { BlogType } from "./Blog";

export type ContextType = {
    db: BlogType,
    pubsub: PubSub
}