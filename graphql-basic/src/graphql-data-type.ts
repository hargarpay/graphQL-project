import { GraphQLServer } from "graphql-yoga";


const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;

const resolvers = {
    Query: {
        id(){
            return 456;
        },
        name(){
            return "John";
        },
        age(){
            return 30;
        },
        employed(){
            return true;
        },
        gpa(){
            return null
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