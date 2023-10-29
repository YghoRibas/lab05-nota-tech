import { useEffect, useState } from "react";
import { List } from "../domain/entities/list";
import { Action, Func } from "../domain/utils/func";
import useValueHistory from "./use-value-history";

export interface Filterable<T> {
  /** If not present, it is First Page */
  lastId?: T[keyof T];
  rowsPerPage: number;
  order?: 'asc' | 'desc';
  orderBy: keyof T;
  getLast?: boolean;
}

export interface PageChangeEvent {
  oldPage: number;
  newPage: number;
}

export interface UseListPaginationProps<T> {
  /**REQUIRED */
  getter: Func<[Filterable<T>], Promise<List<T>>>;
  defaultOrderBy: keyof T;

  /**OPTIONAL */
  onPageChange?: Action<[PageChangeEvent]>;
  defaultRowsPerPage?: number;
  defaultOrder?: 'asc' | 'desc';
}

export default function useListPagination<T>({
  getter,
  defaultOrderBy,
  defaultOrder = 'desc',
  defaultRowsPerPage = 5,
  onPageChange
}: UseListPaginationProps<T>) {
  const [page, setPage] = useState(0)

  const [loading, setLoading] = useState(true)
  
  const [initial, setInitial] = useState(true)

  const [lastId, changeLastId, setLastId] = useValueHistory<T[keyof T]>();

  const [refreshLastId, setRefreshLastId] = useState<T[keyof T]>()

  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder)

  const [orderBy, setOrderBy] = useState<keyof T>(defaultOrderBy)

  const [result, setResult] = useState<List<T>>();

  const modifyLastId = (result: List<T>) => {
    if (!result.data.length) return;
    const idof = result.data.length - 1;
    const lastItem = result.data.at(idof) as T;
    changeLastId(lastItem[orderBy]);
  }

  const toggleOrder = () => {
    setOrder(order => {
      if (order == 'asc')
        return 'desc'

      return 'asc'
    })

    getFirstPage()
  }

  const handlePrevPage = () => {
    setPage(page - 1)

    setLastId(lastId.prev!.prev!)

    if (onPageChange)
      onPageChange({ oldPage: page, newPage: page - 1 })
  }

  const handleNextPage = () => {
    setPage(page + 1)

    if (onPageChange)
      onPageChange({ oldPage: page, newPage: page + 1 })
  }

  const handleOrder = (order: 'asc' | 'desc') =>
    setOrder(order)

  const handleOrderBy = (orderBy: keyof T) =>
    setOrderBy(orderBy)

  const handlerRowsPerPage = (rows: number) =>
    [setRowsPerPage(rows), getFirstPage()]

  const getFirstPage = () => {
    if (page == 0)
      return;

    setLastId({
      next: undefined,
      prev: undefined,
      value: undefined
    })

    setPage(0)

    if (onPageChange)
      onPageChange({ oldPage: page, newPage: 0 })
  }

  const getLastPage = () => {
    const lastPage = Math.ceil(result?.totalCount! / rowsPerPage) - 1

    if (page == lastPage)
      return;

    setLastId({
      next: undefined,
      prev: undefined,
      value: undefined
    })

    setPage(lastPage)

    if (onPageChange)
      onPageChange({ oldPage: page, newPage: lastPage })
  }

  const refresh = (lid = refreshLastId) => {
    const lastPage = Math.ceil(result?.totalCount ?? -1 / rowsPerPage) - 1

    const isLast = lastPage == page

    getter(<any>{
      lastId: lid,
      rowsPerPage,
      limit: rowsPerPage,
      order: order,
      orderBy: orderBy,
      ...(isLast && {
        getLast: true
      })
    })
      .then(result => {
        setResult(result)
        setLoading(false)
      })
  }

  useEffect(() => {
    if(initial) return;

    setLoading(true)
    refresh()
  }, [rowsPerPage, order, orderBy])

  useEffect(() => {
    const lastPage = Math.ceil(result?.totalCount ?? -1 / rowsPerPage) - 1

    const isLast = lastPage == page

    setLoading(true)

    getter(<any>{
      lastId: lastId.value,
      rowsPerPage,
      limit: rowsPerPage,
      order: order,
      orderBy: orderBy,
      ...(isLast && {
        getLast: true
      })
    })
      .then(result => {
        setResult(result)
        setRefreshLastId(lastId.value)
        modifyLastId(result)
        setInitial(false)
        setLoading(false)
      })
  }, [page])
  
  return {
    page,
    loading,
    nextPage: handleNextPage,
    prevPage: handlePrevPage,
    getFirstPage,
    getLastPage,
    rowsPerPage,
    setRowsPerPage: handlerRowsPerPage,
    order,
    setOrder: handleOrder,
    toggleOrder,
    orderBy,
    setOrderBy: handleOrderBy,
    refresh: () => refresh(),
    totalCount: result?.totalCount ?? 0,
    list: result?.data ?? []
  }
}