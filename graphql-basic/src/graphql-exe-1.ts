import { GraphQLServer } from "graphql-yoga";


const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

const resolvers = {
    Query: {
        title(){
            return "Toy";
        },
        price(){
            return 12.50;
        },
        releaseYear(){
            return 2020;
        },
        rating(){
            return null;
        },
        inStock(){
            return true
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