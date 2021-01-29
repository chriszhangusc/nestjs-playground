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

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async create(newTodoInput: CreateTodoInput) {
    const user = await this.userService.findOne(String(newTodoInput.userId));
    const newTodo = { content: newTodoInput.content, user } as Todo;
    return await this.todosRepository.save(newTodo);
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
