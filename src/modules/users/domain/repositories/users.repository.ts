import { IUser } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findByUsername(username: string): Promise<IUser>;
}
