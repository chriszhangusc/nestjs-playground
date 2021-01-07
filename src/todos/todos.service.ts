import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todo } from './todo.entity';

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

  async create(createTodoDto: CreateTodoDto) {
    const user = await this.userService.findOne(String(createTodoDto.userId));
    const newTodo = { content: createTodoDto.content, user } as Todo;
    return this.todosRepository.create(newTodo);
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
