import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUserById(id: number): Promise<User> {
    return this.findOne(id);
  }

  async getUsersByIds(ids: number[]): Promise<User[]> {
    return this.findByIds(ids);
  }
}
