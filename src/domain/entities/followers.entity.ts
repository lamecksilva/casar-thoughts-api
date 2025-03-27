import { UserEntityTypeORM } from 'src/domain/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

export interface IFollow {
  id: string;
  followerId: string;
  followingId: string;
}

@Entity({ name: 'followers' })
export class FollowEntityTypeORM {
  @PrimaryColumn({ type: 'uuid' })
  followerId: string;

  @PrimaryColumn({ type: 'uuid' })
  followingId: string;

  @ManyToOne(() => UserEntityTypeORM, (user) => user.following, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followerId' })
  follower: UserEntityTypeORM;

  @ManyToOne(() => UserEntityTypeORM, (user) => user.followers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followingId' })
  following: UserEntityTypeORM;
}
