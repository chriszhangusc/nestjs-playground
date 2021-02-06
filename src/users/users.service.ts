import { Injectable, Scope } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UsersRepository } from './users.repository';
import { BaseService } from '../shared/base.service';

@Injectable({ scope: Scope.REQUEST })
export class UsersService extends BaseService<User> {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }

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

  async findOne(id: string): Promise<User> {
    // Create a loader and then load
    // new UsersLoader().generateLoader();
    // return this.usersRepository.getUserById(Number(id));
    // return this.userLoader.load(Number(id));
    return this.loader.load(Number(id));
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
