import { IBcryptService } from "src/domain/adapters/bcrypt.interface";
import { IUserService } from "src/domain/interfaces/IUserService.interface";
import { ILogger } from "src/domain/logger/logger.interface";
import { UserRegisterModel } from "src/domain/model/user";

export class RegisterUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly userService: IUserService,
        private readonly bcryptService: IBcryptService,
    ) { }

    async registerUser(registerUser: UserRegisterModel): Promise<UserRegisterModel> {
        const { username, password } = registerUser;

        const salt = await this.bcryptService.generateSalt();
        const hashedPassword = await this.bcryptService.generateHashFromSalt(password, salt);

        const user = new UserRegisterModel();
        user.username = username;
        user.password = hashedPassword;

        return this.userService.registerUser(user);
    }
}