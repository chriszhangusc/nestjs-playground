import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = { content: createTodoDto.content } as Todo;
    return this.todosRepository.create(newTodo);
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
