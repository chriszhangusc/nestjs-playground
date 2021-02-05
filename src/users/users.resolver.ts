import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => User, { name: 'user' })
  async user(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query((returns) => [User], { name: 'users' })
  async users() {
    return this.usersService.findAll();
  }

  // @ResolveField()
  // async todos(@Parent() user: User) {
  //   // Which one?
  //   return this.todosService.getTodosByUserId(`${user.id}`);
  //   // return this.usersService.getTodosByUserId(user.id);
  // }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') userInput: CreateUserInput) {
    return this.usersService.create(userInput);
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
