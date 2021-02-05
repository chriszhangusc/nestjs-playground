import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './todos.input';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    private userService: UsersService,
  ) {}

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
    return this.todosRepository.find({ where: { userId } });
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
