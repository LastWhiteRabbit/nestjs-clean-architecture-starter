export interface IBcryptService {
    hash(hashString: string): Promise<string>;
    compare(password: string, hashPassword: string): Promise<boolean>;
    generateSalt(): Promise<string>;
    generateHashFromSalt(password: string, salt: string): Promise<string>;
  }
