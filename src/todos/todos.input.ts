import { Field, InputType } from '@nestjs/graphql';
import { Todo } from './todo.entity';

@InputType('CreateTodoInput')
export class CreateTodoInput implements Partial<Todo> {
  @Field()
  content: string;
  @Field()
  userId: number;
}
