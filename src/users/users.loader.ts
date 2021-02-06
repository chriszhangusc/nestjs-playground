import * as DataLoader from 'dataloader';

export class BaseService {
  public readonly loader;

  constructor(repository: any) {
    this.loader = new DataLoader((ids: number[]) => repository.findByIds(ids));
  }
}
