import { AutoMap } from '@automapper/classes';

export class ProcessedData<TItem> {
  constructor(
    statusCode: number,
    statusMessage: string,
    totalItemCount: number,
    items: TItem[],
  ) {
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.totalItemCount = totalItemCount;
    this.items = items;
  }

  @AutoMap()
  public statusCode: number;

  @AutoMap()
  public statusMessage: string;

  @AutoMap()
  public totalItemCount: number;

  @AutoMap()
  public items: TItem[];
}
