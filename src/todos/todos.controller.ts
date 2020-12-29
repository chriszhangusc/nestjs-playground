import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<CreateTodoDto> {
    return this.todosService.create(createTodoDto);
  }
}
