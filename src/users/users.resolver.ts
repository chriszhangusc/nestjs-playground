import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query((returns) => [User])
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

// 1. Call dataloader in the resolver layer and have dataloader calls service getAllByIds
// 2. Put dataloader in between the service layer and repository layer downside is that we have to scope service object to every request
