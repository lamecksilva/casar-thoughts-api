import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser, UserEntityTypeORM } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { IFindByUsernameOption, UsersRepository } from './users.repository';

@Injectable()
export class UsersTypeORMRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntityTypeORM)
    private readonly userRepository: Repository<UserEntityTypeORM>,
  ) {}

  async findById(
    userId: string,
    options?: IFindByUsernameOption,
  ): Promise<IUser> {
    return options?.withRelations
      ? await this.userRepository.findOne({
          where: { id: userId },
          relations: ['following', 'followers', 'posts'],
        })
      : await this.userRepository.findOneBy({ id: userId });
  }

  async findByUsername(
    username: string,
    options: IFindByUsernameOption,
  ): Promise<IUser | null> {
    return options?.withRelations
      ? await this.userRepository.findOne({
          where: { username },
          relations: ['following', 'followers', 'posts'],
        })
      : await this.userRepository.findOneBy({ username });
  }
}
