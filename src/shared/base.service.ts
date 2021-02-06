import { Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

export abstract class BaseService<T> {
  public readonly loader;

  constructor(repository: Repository<T>) {
    this.loader = new DataLoader((ids: number[]) => repository.findByIds(ids));
  }
}
