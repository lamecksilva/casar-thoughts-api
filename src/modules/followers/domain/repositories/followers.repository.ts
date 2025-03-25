export abstract class FollowersRepository {
  abstract isFollowing(
    followerId: string,
    followingId: string,
  ): Promise<boolean>;
  abstract followUser(followerId: string, followingId: string): Promise<void>;
  abstract unfollowUser(followerId: string, followingId: string): Promise<void>;
}
