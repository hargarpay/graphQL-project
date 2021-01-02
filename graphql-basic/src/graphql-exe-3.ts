import { GraphQLServer } from "graphql-yoga";
import * as graphQL from "graphql-yoga";
import { Post } from "./types/Post";
import { User } from "./types/User";


const typeDefs = `
    ${User}
    ${Post}
    type Query {
        greeting(name: String): String!
        add(a: [Float!]!): Float!
        me: User
        post: Post
    }
`;

const resolvers = {
    Query: {
        greeting(_p: any, args: any,_c: any, _i: any):string{
            // console.group("Viewing Parameters");
            // console.log("parent", parent);
            // console.log("args", args);
            // console.log("ctx", ctx);
            // console.log("info", info);
            // console.groupEnd();
            return `Welcome ${args.name || "Guest"}`
        },
        add(_p: any, args: any,_c: any, _i: any): number {
            if (!args.a) return 0;
            return (args.a as number[]).reduce((b, c) => (b + c), 0);
        },
        me(){
            return {
                id: 12345,
                name: "John Doe",
                email: "johndoe@sagedevs.com",
                age: 30
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
}

const servers = new GraphQLServer({
    typeDefs,
    resolvers
});

servers.start(() => {
    console.log("The server is up")
})