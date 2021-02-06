import { Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

export abstract class BaseRepository<T> extends Repository<T> {
  public readonly loader;

  constructor(repository: Repository<T>) {
    super();
    this.loader = new DataLoader((ids: number[]) => repository.findByIds(ids));
  }
}
