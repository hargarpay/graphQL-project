import { GraphQLServer } from "graphql-yoga";
import { Post } from "./types/Post";
import { User } from "./types/User";


const typeDefs = `
    ${User}
    ${Post}
    type Query {
        me: User
        post: Post
    }
`;

const resolvers = {
    Query: {
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