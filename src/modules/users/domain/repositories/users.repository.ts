import { IUser } from '../entities/user.entity';

export interface IFindByUsernameOption {
  withRelations: boolean;
}
export abstract class UsersRepository {
  abstract findByUsername(
    username: string,
    options?: IFindByUsernameOption,
  ): Promise<IUser>;

  abstract findById(
    userId: string,
    options?: IFindByUsernameOption,
  ): Promise<IUser>;
}
