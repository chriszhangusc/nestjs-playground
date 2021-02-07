import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserInput): Promise<User> {
    const user = {
      email: createUserDto.email,
      username: createUserDto.username,
      todos: [],
    };

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUsersByIds(userIds: string[]): Promise<User[]> {
    return this.usersRepository.findByIds(userIds);
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.getUserById(Number(id));
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
