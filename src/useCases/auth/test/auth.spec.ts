import { IBcryptService } from '../../../domain/adapters/bcrypt.interface';
import { IJwtService } from '../../../domain/adapters/jwt.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';
import { ILogger } from '../../../domain/logger/logger.interface';
import { UserModel } from '../../../domain/model/user';
import { IUserService } from 'src/domain/interfaces/IUserService.interface';
import { IsAuthenticatedUseCases } from '../isAuthenticated.usecases';
import { LoginUseCases } from '../login.usecases';
import { LogoutUseCases } from '../logout.usecases';

describe('uses_cases/authentication', () => {
  let loginUseCases: LoginUseCases;
  let logoutUseCases: LogoutUseCases;
  let isAuthenticated: IsAuthenticatedUseCases;
  let logger: ILogger;
  let jwtService: IJwtService;
  let jwtConfig: JWTConfig;
  let adminUserRepo: IUserService;
  let bcryptService: IBcryptService;

  beforeEach(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    jwtService = {} as IJwtService;
    jwtService.createToken = jest.fn();

    jwtConfig = {} as JWTConfig;
    jwtConfig.getJwtExpirationTime = jest.fn();
    jwtConfig.getJwtSecret = jest.fn();
    jwtConfig.getJwtRefreshSecret = jest.fn();
    jwtConfig.getJwtRefreshExpirationTime = jest.fn();

    adminUserRepo = {} as IUserService;
    adminUserRepo.getUserByUsername = jest.fn();
    adminUserRepo.updateLastLogin = jest.fn();
    adminUserRepo.updateRefreshToken = jest.fn();

    bcryptService = {} as IBcryptService;
    bcryptService.compare = jest.fn();
    bcryptService.hash = jest.fn();

    loginUseCases = new LoginUseCases(
      logger,
      jwtService,
      jwtConfig,
      adminUserRepo,
      bcryptService,
    );
    logoutUseCases = new LogoutUseCases();
    isAuthenticated = new IsAuthenticatedUseCases(adminUserRepo);
  });

  describe('creating a cookie', () => {
    it('should return a cookie', async () => {
      const expireIn = '200';
      const token = 'token';
      (jwtConfig.getJwtSecret as jest.Mock).mockReturnValue(() => 'secret');
      (jwtConfig.getJwtExpirationTime as jest.Mock).mockReturnValue(expireIn);
      (jwtService.createToken as jest.Mock).mockReturnValue(token);

      expect(await loginUseCases.getCookieWithJwtToken('username')).toEqual(
        `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expireIn}`,
      );
    });
    it('should return a refresh cookie', async () => {
      const expireIn = '200';
      const token = 'token';
      (jwtConfig.getJwtRefreshSecret as jest.Mock).mockReturnValue(
        () => 'secret',
      );
      (jwtConfig.getJwtRefreshExpirationTime as jest.Mock).mockReturnValue(
        expireIn,
      );
      (jwtService.createToken as jest.Mock).mockReturnValue(token);
      (bcryptService.hash as jest.Mock).mockReturnValue(
        Promise.resolve('hashed password'),
      );
      (adminUserRepo.updateRefreshToken as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );

      expect(
        await loginUseCases.getCookieWithJwtRefreshToken('username'),
      ).toEqual(`Refresh=${token}; HttpOnly; Path=/; Max-Age=${expireIn}`);
      expect(adminUserRepo.updateRefreshToken).toBeCalledTimes(1);
    });
  });

  describe('validation local strategy', () => {
    it('should return null because user not found', async () => {
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );

      expect(
        await loginUseCases.validateUserForLocalStragtegy(
          'username',
          'password',
        ),
      ).toEqual(null);
    });
    it('should return null because wrong password', async () => {
      const user: UserModel = {
        id: 1,
        username: 'username',
        password: 'password',
        createDate: new Date(),
        updatedDate: new Date(),
        lastLogin: null,
        hashRefreshToken: 'refresh token',
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(false),
      );

      expect(
        await loginUseCases.validateUserForLocalStragtegy(
          'username',
          'password',
        ),
      ).toEqual(null);
    });
    it('should return user without password', async () => {
      const user: UserModel = {
        id: 1,
        username: 'username',
        password: 'password',
        createDate: new Date(),
        updatedDate: new Date(),
        lastLogin: null,
        hashRefreshToken: 'refresh token',
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(true),
      );

      const { password, ...rest } = user; // eslint-disable-line @typescript-eslint/no-unused-vars

      expect(
        await loginUseCases.validateUserForLocalStragtegy(
          'username',
          'password',
        ),
      ).toEqual(rest);
    });
  });

  describe('Validation jwt strategy', () => {
    it('should return null because user not found', async () => {
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(false),
      );

      expect(
        await loginUseCases.validateUserForJWTStragtegy('username'),
      ).toEqual(null);
    });

    it('should return user', async () => {
      const user: UserModel = {
        id: 1,
        username: 'username',
        password: 'password',
        createDate: new Date(),
        updatedDate: new Date(),
        lastLogin: null,
        hashRefreshToken: 'refresh token',
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );

      expect(
        await loginUseCases.validateUserForJWTStragtegy('username'),
      ).toEqual(user);
    });
  });

  describe('Validation refresh token', () => {
    it('should return null because user not found', async () => {
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );

      expect(
        await loginUseCases.getUserIfRefreshTokenMatches(
          'refresh token',
          'username',
        ),
      ).toEqual(null);
    });

    it('should return null because user not found', async () => {
      const user: UserModel = {
        id: 1,
        username: 'username',
        password: 'password',
        createDate: new Date(),
        updatedDate: new Date(),
        lastLogin: null,
        hashRefreshToken: 'refresh token',
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(false),
      );

      expect(
        await loginUseCases.getUserIfRefreshTokenMatches(
          'refresh token',
          'username',
        ),
      ).toEqual(null);
    });

    it('should return user', async () => {
      const user: UserModel = {
        id: 1,
        username: 'username',
        password: 'password',
        createDate: new Date(),
        updatedDate: new Date(),
        lastLogin: null,
        hashRefreshToken: 'refresh token',
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );
      (bcryptService.compare as jest.Mock).mockReturnValue(
        Promise.resolve(true),
      );

      expect(
        await loginUseCases.getUserIfRefreshTokenMatches(
          'refresh token',
          'username',
        ),
      ).toEqual(user);
    });
  });

  describe('logout', () => {
    it('should return an array to invalid the cookie', async () => {
      expect(await logoutUseCases.execute()).toEqual([
        'Authentication=; HttpOnly; Path=/; Max-Age=0',
        'Refresh=; HttpOnly; Path=/; Max-Age=0',
      ]);
    });
  });

  describe('isAuthenticated', () => {
    it('should return an array to invalid the cookie', async () => {
      const user: UserModel = {
        id: 1,
        username: 'username',
        password: 'password',
        createDate: new Date(),
        updatedDate: new Date(),
        lastLogin: null,
        hashRefreshToken: 'refresh token',
      };
      (adminUserRepo.getUserByUsername as jest.Mock).mockReturnValue(
        Promise.resolve(user),
      );

      const { password, ...rest } = user; // eslint-disable-line @typescript-eslint/no-unused-vars

      expect(await isAuthenticated.execute('username')).toEqual(rest);
    });
  });
});
