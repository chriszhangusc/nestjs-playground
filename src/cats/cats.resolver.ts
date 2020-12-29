import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatInput } from './cat.input';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';

@Resolver()
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'Hello';
  }

  @Query(() => [CreateCatDto])
  async cats() {
    return this.catsService.findAll();
  }

  // @Mutation(() => CreateCatDto);
  // async createCat(@Args('input') input: CatInput) {
  //   return this.catsService.create(input);
  // }
}
