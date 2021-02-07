import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from 'src/todos/todos.module';
import { UsersLoader } from './users.loader';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    forwardRef(() => TodosModule),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [UsersService, UsersResolver, UsersLoader],
  exports: [UsersService, UsersLoader],
})
export class UsersModule {}
