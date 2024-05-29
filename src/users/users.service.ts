import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserModel } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  public async readUserByUserId(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { userId },
      select: { userPw: true },
    });
    if (!user)
      throw new NotFoundException('해당 userId 를 가진 사용자가 없습니다!');
    return user;
  }
}
