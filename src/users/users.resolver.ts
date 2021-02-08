import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TodosLoader } from 'src/todos/todos.loader';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private todosLoader: TodosLoader,
  ) {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query((returns) => [User])
  async users() {
    return this.usersService.findAll();
  }

  @ResolveField()
  async todos(@Parent() user: User) {
    return this.todosLoader.todosByUserIdsLoader.load(`${user.id}`);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') userInput: CreateUserInput) {
    return this.usersService.create(userInput);
  }
}
