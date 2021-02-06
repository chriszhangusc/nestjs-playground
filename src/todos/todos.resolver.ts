import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
// import { UsersLoader } from 'src/users/users.loader';
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

  @Query((returns) => Todo)
  async todo(@Args('id', { type: () => String }) id: string) {
    return this.todosService.findOne(id);
  }

  @Query((returns) => [Todo])
  async todos() {
    return this.todosService.findAll();
  }

  @ResolveField()
  async user(@Parent() todo: Todo, @Context() ctx) {
    return this.usersService.findOne(`${todo.userId}`);

    // dataloader
    // return this.usersLoader.loader.load(todo.userId);

    // From context it works but doesn't seem right because it's not per request
    // return ctx.userLoader.load(todo.userId);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') todoInput: CreateTodoInput) {
    return this.todosService.create(todoInput);
  }
}
