import * as lodash from 'lodash';
import { EntityRepository, In, Repository } from 'typeorm';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {
  async getTodosByUserIds(userIds: number[]) {
    const todos = await this.createQueryBuilder()
      .where({
        userId: In(userIds),
      })
      .getMany();

    const todosById = lodash.groupBy(todos, 'userId');

    return userIds.map((userId) => todosById[userId]);
  }
}
