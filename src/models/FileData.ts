export interface FileData {
  id?: number;
  metaId?: number;
  data: {
    [columnName: string]: string;
  };
  searchTerms: string[];
}
