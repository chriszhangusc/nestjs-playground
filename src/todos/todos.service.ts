import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UsersService } from 'src/users/users.service';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './todos.input';
import { TodosRepository } from './todos.repository';

@Injectable({ scope: Scope.REQUEST })
export class TodosService {
  private readonly usersTodosLoader;

  constructor(
    private todosRepository: TodosRepository,
    private userService: UsersService,
  ) {
    this.usersTodosLoader = new DataLoader((userIds: any[]) =>
      todosRepository.getTodosByUserIds(userIds),
    );
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.todosRepository.find();
    return todos;
  }

  async findOne(id: string): Promise<Todo> {
    const todo = this.todosRepository.findOne(id);
    return todo;
  }

  async create(newTodoInput: CreateTodoInput) {
    const user = await this.userService.findOne(String(newTodoInput.userId));
    const newTodo = { content: newTodoInput.content, user } as Todo;
    return await this.todosRepository.save(newTodo);
  }

  async getTodosByUserId(userId: string) {
    return this.usersTodosLoader.load(userId);
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
