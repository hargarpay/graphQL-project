import { GraphQLServer } from "graphql-yoga";
import { Post, PostType } from "./types/Post";
import { User, UserType } from "./types/User";
import { Comment, CommentType } from "./types/Comment";

const users: UserType[] = [
    {
        id: 1,
        name: "John",
        email: "john@sagedevs.com",
        age: 30,
    },
    {
        id: 2,
        name: "Nick",
        email: "nick@sagedevs.com",
        age: 35,
    },
    {
        id: 3,
        name: "Vera",
        email: "vera@sagedevs.com",
        age: null
    },
];

const posts: PostType[] = [
    {
        id: 1,
        title: "GraphQL 101",
        body: "This is graphql 101 tutorial",
        published: false,
        author: 1,
    },
    {
        id: 2,
        title: "Machine Learning 201",
        body: "This is an intermediate machine class",
        published: true,
        author: 1,
    },
    {
        id: 3,
        title: "Kafka",
        body: "This is an event bus tutorial",
        published: true,
        author: 2,
    }
];

const comments: CommentType[] = [
    {
        id: 1,
        text: "This is really enlighten",
        post: 1,
        user: 2,
    },
    {
        id: 2,
        text: "This is cool",
        post: 2,
        user: 3
    },
    {
        id: 3,
        text: "Hmmm, there are some errors in the subtitle",
        post: 3,
        user: 1
    },
    {
        id: 4,
        text: "Chai, what a tutorial",
        post: 3,
        user: 3
    },
]

const typeDefs = `
    ${User}
    ${Post}
    ${Comment}
    type Query {
        users(email: String, name: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User
        post: Post
    }
`;

const resolvers = {
    Query: {
        users(_p: any, args: any, _c: any, _i: any){
            if (args.email){
                return users.filter((u) => u.email.toLowerCase().indexOf(args.email.toLowerCase()) > -1);
            }

            if (args.name){
                return users.filter((u) => u.name.toLowerCase() === args.name.toLowerCase());
            }

            return users;

        },
        posts(_p: any, args: any, _c: any, _i: any): PostType[]{
            if(args.query){
                const q2Lower = args.query.toLowerCase();
                return posts.filter((p) => (
                    p.body.toLowerCase().includes(q2Lower) ||
                    p.title.toLowerCase().includes(q2Lower)
                ))
            }
            return posts;
        },
        comments(){
            return comments
        },
        me(){
            return {
                id: 12345,
                name: "John Doe",
                email: "johndoe@sagedevs.com",
                age: 30,
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
    },
    Post: {
        author(parent: PostType){
            return users.find(u => u.id === parent.author)
        },
        comments(parent: PostType){
            return comments.filter(c => c.post === parent.id)
        }
    },
    User: {
        posts(parent: UserType){
            return posts.filter(p => p.author === parent.id)
        },
        comments(parent: UserType){
            return comments.filter(c => c.user === parent.id)
        }
    },
    Comment: {
        post(parent: CommentType){
            return posts.find(p => p.id === parent.post)
        },
        user(parent: CommentType){
            return users.find(u => u.id === parent.user)
        },
    }
}

const servers = new GraphQLServer({
    typeDefs,
    resolvers
});

servers.start(() => {
    console.log("The server is up")
})