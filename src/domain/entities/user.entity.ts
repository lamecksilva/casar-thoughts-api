import { IPost, PostEntityTypeORM } from 'src/domain/entities/post.entity';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
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
@Check(`username ~ '^[a-zA-Z0-9]+$'`)
@Entity({
  name: 'users',
})
export class UserEntityTypeORM implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ unique: true, type: 'varchar', length: 14 })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  displayName: string;

  @ManyToMany(() => UserEntityTypeORM, (user) => user.followers)
  @JoinTable({
    name: 'followers',
    joinColumn: { name: 'followerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followingId', referencedColumnName: 'id' },
  })
  following: UserEntityTypeORM[];

  @ManyToMany(() => UserEntityTypeORM, (user) => user.following)
  followers: UserEntityTypeORM[];

  @OneToMany(() => PostEntityTypeORM, (post) => post.user)
  posts: PostEntityTypeORM[];
}
