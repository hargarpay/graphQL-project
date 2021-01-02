import { CommentType } from "./types/Comment";
import { PostType } from "./types/Post";
import { UserType } from "./types/User";
import { BlogType } from "./types/Blog";

const users: UserType[] = [
    {
        id: "1",
        name: "John",
        email: "john@sagedevs.com",
        age: 30,
    },
    {
        id: "2",
        name: "Nick",
        email: "nick@sagedevs.com",
        age: 35,
    },
    {
        id: "3",
        name: "Vera",
        email: "vera@sagedevs.com",
        age: null
    },
];

const posts: PostType[] = [
    {
        id: "1",
        title: "GraphQL 101",
        body: "This is graphql 101 tutorial",
        published: false,
        author: "1",
    },
    {
        id: "2",
        title: "Machine Learning 201",
        body: "This is an intermediate machine class",
        published: true,
        author: "1",
    },
    {
        id: "3",
        title: "Kafka",
        body: "This is an event bus tutorial",
        published: true,
        author: "2",
    }
];

const comments: CommentType[] = [
    {
        id: "1",
        text: "This is really enlighten",
        post: "1",
        user: "2",
    },
    {
        id: "2",
        text: "This is cool",
        post: "2",
        user: "3"
    },
    {
        id: "3",
        text: "Hmmm, there are some errors in the subtitle",
        post: "3",
        user: "1"
    },
    {
        id: "4",
        text: "Chai, what a tutorial",
        post: "3",
        user: "3"
    },
]

export const db: BlogType = {
    comments,
    posts,
    users
}