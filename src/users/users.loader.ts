import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UsersService } from './users.service';

@Injectable({ scope: Scope.REQUEST })
export class UsersLoader {
  public readonly userByIdLoader;
  // Other user related loaders...
  // public readonly otherUserLoader

  constructor(private readonly usersService: UsersService) {
    this.userByIdLoader = new DataLoader((userIds: string[]) =>
      usersService.getUsersByIds(userIds),
    );
  }
}
