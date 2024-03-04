import { UserModel, UserRegisterModel } from '../model/user';

export interface IUserService {
  getUserByUsername(username: string): Promise<UserModel>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  registerUser(user: UserRegisterModel): Promise<UserRegisterModel>;
}