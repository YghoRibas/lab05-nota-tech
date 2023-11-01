export interface List<T> {
  data: Array<T>;
  totalCount: number;
  success: boolean;
  message?: string;
}