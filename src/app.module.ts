import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TodosModule,
    UsersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'postgres_user',
      password: 'postgres_password',
      database: 'nestjsdb',
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
  ],
})
export class AppModule {}
