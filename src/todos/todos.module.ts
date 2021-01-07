import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Todo } from './todo.entity';
import { TodosController } from './todos.controller';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService, TodosResolver],
})
export class TodosModule {}
