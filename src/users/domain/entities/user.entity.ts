import {
  IPost,
  PostEntityTypeORM,
} from 'src/posts/domain/entities/post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

export interface IUser {
  id: string;
  createdAt: Date;
  username: string;
  displayName: string;
  following: IUser[];
  followers: IUser[];
  posts: IPost[];
}

// Poderia ser outro arquivo somente para essa entidade do TypeORM, mas resolvi deixar aqui mesmo.
@Entity()
export class UserEntityTypeORM implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ unique: true, type: 'varchar', length: 14 })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  displayName: string;

  @ManyToMany(() => UserEntityTypeORM, (user) => user.following)
  @JoinTable({
    name: 'followers',
    joinColumn: { name: 'followerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followingId', referencedColumnName: 'id' },
  })
  following: UserEntityTypeORM[];

  @ManyToMany(() => UserEntityTypeORM, (user) => user.followers)
  followers: UserEntityTypeORM[];

  @OneToMany(() => PostEntityTypeORM, (post) => post.user)
  posts: PostEntityTypeORM[];
}
