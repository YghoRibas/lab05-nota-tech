import { Func } from "src/modules/@shared/domain/utils/func"
import useListPagination from "src/modules/@shared/hooks/use-list-pagination";

export type PagnationState<T> = 
  Partial<Omit<ListPaginationProps<T>, 'renderer'>>

export interface ListPaginationProps<T> extends ReturnType<typeof useListPagination<T>>{
  /**RENDERER */
  renderer: Func<[PagnationState<T>], JSX.Element>
}

export default function ListPagination<T>({
  renderer,
  ...other
}: ListPaginationProps<T>){
  return renderer(other);
}