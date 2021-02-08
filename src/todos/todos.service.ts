import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './todos.input';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(
    private todosRepository: TodosRepository,
    private userService: UsersService,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async create(newTodoInput: CreateTodoInput) {
    const user = await this.userService.findOne(String(newTodoInput.userId));
    const newTodo = { content: newTodoInput.content, user } as Todo;
    return this.todosRepository.save(newTodo);
  }

  async getTodosByUserIds(userIds: string[]) {
    return this.todosRepository.getTodosByUserIds(userIds);
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
