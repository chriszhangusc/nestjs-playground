import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './todos.input';
import { TodosService } from './todos.service';

@Resolver((of) => Todo)
export class TodosResolver {
  constructor(private todosService: TodosService) {}

  @Query((returns) => Todo, { name: 'todo' })
  async getTodo(@Args('id', { type: () => String }) id: string) {
    return this.todosService.findOne(id);
  }

  @Query((returns) => [Todo], { name: 'todos' })
  async getTodos() {
    return this.todosService.findAll();
  }

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') todoInput: CreateTodoInput) {
    return this.todosService.create(todoInput);
  }
}
