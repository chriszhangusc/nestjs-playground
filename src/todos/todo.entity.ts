import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('todos')
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  content: string;

  @Column({ name: 'is_deleted', default: false })
  @Field()
  isDeleted: boolean;

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn()
  user: User;
}
