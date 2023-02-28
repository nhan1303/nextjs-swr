export interface IArticle {
  id: string;
  title: string;
}

export interface IArticleParams {
  limit: string;
  offset: string;
  orders?: string;
  filters?: string;
}

export interface IListResponse<T> {
  contents: T[];
  limit: number;
  offset: number;
  totalCount: number;
}

export interface IFetchService<T> {
  data: T;
  isLoading: boolean;
  error?: Error;
}
