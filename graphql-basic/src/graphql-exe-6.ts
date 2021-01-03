import { GraphQLServer, PubSub } from "graphql-yoga";
import { db } from "./db";
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";
import { Subscription } from "./resolvers/Subscription";
import { Post } from "./resolvers/Post";
import { User } from "./resolvers/User";
import { Comment } from "./resolvers/Comment";

const pubsub = new PubSub();

const resolvers = {
    Query, Mutation, Post, User, Comment, Subscription
};

const servers = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: {
        db,
        pubsub
    }
});

servers.start(() => { console.log("The server is up")})
