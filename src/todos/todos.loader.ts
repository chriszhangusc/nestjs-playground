import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { TodosService } from './todos.service';

@Injectable({ scope: Scope.REQUEST })
export class TodosLoader {
  public readonly todosByUserIdsLoader;
  // Other todo related loaders...
  // public readonly otherUserLoader

  constructor(private readonly todosService: TodosService) {
    this.todosByUserIdsLoader = new DataLoader((userIds: string[]) =>
      todosService.getTodosByUserIds(userIds),
    );
  }
}
