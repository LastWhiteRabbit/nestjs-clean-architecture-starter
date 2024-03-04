export class UserWithoutPassword {
    id: number;
    username: string;
    createDate: Date;
    updatedDate: Date;
    lastLogin: Date;
    hashRefreshToken: string;
  }
  
  export class UserModel extends UserWithoutPassword {
    password: string;
  }

  export class UserRegisterModel {
    username: string;
    password: string;
  }