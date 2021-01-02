import { CommentType} from  "./Comment";
import { PostType} from  "./Post";
import { UserType} from  "./User";

export type BlogType = {
    comments: CommentType[],
    posts: PostType[],
    users: UserType[],
}