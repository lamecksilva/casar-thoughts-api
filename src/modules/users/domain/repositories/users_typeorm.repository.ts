import { Injectable } from '@nestjs/common';
import { IUser, UserEntityTypeORM } from '../entities/user.entity';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersTypeORMRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntityTypeORM)
    private readonly userRepository: Repository<UserEntityTypeORM>,
  ) {}

  async findByUsername(username: string): Promise<IUser | null> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['following', 'followers'],
    });
  }
}
