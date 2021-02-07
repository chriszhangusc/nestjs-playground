import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { TodosLoader } from './todos.loader';
import { TodosRepository } from './todos.repository';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([TodosRepository]),
  ],
  providers: [TodosService, TodosResolver, TodosLoader],
  exports: [TodosService, TodosLoader],
})
export class TodosModule {}
