import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => User, { name: 'user' })
  async getUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query((returns) => [User], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }

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
