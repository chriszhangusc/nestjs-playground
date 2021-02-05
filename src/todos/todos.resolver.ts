import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './todos.input';
import { TodosService } from './todos.service';

@Resolver((of) => Todo)
export class TodosResolver {
  constructor(
    private todosService: TodosService,
    private usersService: UsersService,
  ) {}

  @Query((returns) => Todo, { name: 'todo' })
  async todo(@Args('id', { type: () => String }) id: string) {
    return this.todosService.findOne(id);
  }

  @Query((returns) => [Todo], { name: 'todos' })
  async todos() {
    return this.todosService.findAll();
  }

  @ResolveField()
  async user(@Parent() todo: Todo) {
    return this.usersService.findOne(`${todo.userId}`);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') todoInput: CreateTodoInput) {
    return this.todosService.create(todoInput);
  }
}
