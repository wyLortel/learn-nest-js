import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './type/user.type';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const existsUser = this.findByEmail(email);

    if (existsUser) {
      throw new ConflictException('이미 가입된 이메일 입니다');
    }

    const passwordHash = await argon2.hash(password);
    const signupVerifyToken = randomUUID();

    const newUser: User = {
      id: randomUUID(),
      name,
      email,
      passwordHash,
      signupVerifyToken,
      status: 'PENDING',
      createdAt: new Date(),
    };

    this.users.push(newUser);

    //클라이언트에게 보내는용
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      status: newUser.status,
      signupVerifyToken: newUser.signupVerifyToken,
    };
  }

  private findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
