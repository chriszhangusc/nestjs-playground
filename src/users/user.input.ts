import { Field, InputType } from '@nestjs/graphql';
import { User } from './user.entity';

@InputType('CreateUserInput')
export class CreateUserInput implements Partial<User> {
  @Field()
  username: string;
  @Field()
  email: string;
}
