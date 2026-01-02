export interface FileMeta {
  id?: number;
  fileName: string;
  Count: number;
  headers: string[] | undefined;
  createdAt: Date;
}
