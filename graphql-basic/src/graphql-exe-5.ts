import { GraphQLServer } from "graphql-yoga";
import { db } from "./db";
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";
import { Post } from "./resolvers/Post";
import { User } from "./resolvers/User";
import { Comment } from "./resolvers/Comment";

const resolvers = {
    Query, Mutation, Post, User, Comment
};

const servers = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: db
});

servers.start(() => { console.log("The server is up")})
