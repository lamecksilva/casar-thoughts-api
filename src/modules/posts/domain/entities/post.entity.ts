import {
  IUser,
  UserEntityTypeORM,
} from 'src/modules/users/domain/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface IPost {
  id: string;
  text: string;
  userId: string;
  user: IUser;
  originalPostId?: string;
  originalPost?: IPost;
  createdAt: Date;
}

@Entity({
  name: 'posts',
})
export class PostEntityTypeORM implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  text: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntityTypeORM, (user) => user.posts, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntityTypeORM;

  @Column({ type: 'uuid', nullable: true })
  originalPostId?: string;

  @ManyToOne(() => PostEntityTypeORM, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'originalPostId' })
  originalPost?: PostEntityTypeORM;

  @CreateDateColumn()
  createdAt: Date;
}
