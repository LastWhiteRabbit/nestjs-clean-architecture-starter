import { UserModel, UserWithoutPassword } from '../../domain/model/user';
import { IUserService } from 'src/domain/interfaces/IUserService.interface';
export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: IUserService) {}

  async execute(username: string): Promise<UserWithoutPassword> {
    const user: UserModel = await this.adminUserRepo.getUserByUsername(username);
    const { password, ...info } = user;
    return info;
  }
}