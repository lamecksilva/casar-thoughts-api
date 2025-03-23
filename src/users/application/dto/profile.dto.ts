export class ProfileDto {
  username: string;
  memberSince: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing: boolean;
}

class PostDto {
  id: string;
  text: string;
}
export class FeedDto {
  posts: PostDto[];
  count: number;
}
