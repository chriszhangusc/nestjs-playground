import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersLoader } from 'src/users/users.loader';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './todos.input';
import { TodosService } from './todos.service';

@Resolver((of) => Todo)
export class TodosResolver {
  constructor(
    private todosService: TodosService,
    private usersLoader: UsersLoader,
  ) {}

  @Query((returns) => Todo)
  async todo(@Args('id', { type: () => String }) id: string) {
    return this.todosService.findOne(id);
  }

  @Query((returns) => [Todo])
  async todos() {
    return this.todosService.findAll();
  }

  @ResolveField()
  async user(@Parent() todo: Todo) {
    return this.usersLoader.userByIdLoader.load(todo.userId);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') todoInput: CreateTodoInput) {
    return this.todosService.create(todoInput);
  }
}
