import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable({ scope: Scope.REQUEST })
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private readonly loader;

  constructor() {
    super();
    this.loader = new DataLoader((ids: number[]) => this.findByIds(ids));
  }

  async getUserById(id: number): Promise<User> {
    return this.loader.load(id);
  }

  async getUsersByIds(ids: number[]): Promise<User[]> {
    return this.findByIds(ids);
  }
}
