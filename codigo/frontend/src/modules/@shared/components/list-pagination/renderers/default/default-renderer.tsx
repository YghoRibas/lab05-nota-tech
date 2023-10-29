import { Box, Checkbox, FormControlLabel, Stack, Switch, Table, TableBody, TableContainer, TablePagination, Tooltip, Typography } from "@mui/material";
import { PagnationState } from "../..";
import { Action, Func } from "src/modules/@shared/domain/utils/func";
import { useState } from "react";
import TableHeadCustom from "./table-head";
import styles from './default-renderer.module.scss'
import { Path } from "src/modules/@shared/domain/utils/path";

export interface ColumnOf<T> {
  key: Path<T> | null;
  label: string;
  align: string;
  width: string;
}

interface RenderArgs<T> {
  element: T & { deleted: boolean };
  isSelected?: boolean;
  toggle?: Action<[]>;
}

export interface DefaultRendererProps<T> {
  renderTableRow: Func<[RenderArgs<T>], JSX.Element>;
  defaultDense?: boolean;
  columns: Array<ColumnOf<T>>;
  rowsPerPageOptions?: number[];
  className?: string;
}

export default function useDefaultRenderer<T>({
  renderTableRow,
  defaultDense = true,
  columns,
  rowsPerPageOptions,
  className = styles.defaultClassName
}: DefaultRendererProps<T>) {
  const [dense, setDense] = useState(defaultDense);

  const [selecteds, setSelecteds] = useState<T[]>([]);

  const addSelected = (item: T) =>
    setSelecteds(itens => {
      if (itens.includes(item))
        return itens;

      return [...itens, item];
    })

  const delSelected = (item: T) =>
    setSelecteds(itens => itens.filter(i =>
      i != item))

  const toggleSelected = (item: T) =>
    setSelecteds(itens => {
      if (itens.includes(item))
        return itens.filter(i => i != item)

      return [...itens, item];
    })

  return {
    selecteds,

    addSelected,

    delSelected,

    toggleSelected,

    generator: ({
      page,
      rowsPerPage,
      list,
      totalCount,
      nextPage,
      prevPage,
      getFirstPage,
      getLastPage,
      setRowsPerPage,
      setOrderBy,
      setOrder,
      order,
      orderBy
    }: PagnationState<T>) => {
      const size = dense ? 'small' : 'medium'

      const toggleSelectAll = () => {
        if (selecteds.length > 0)
          return setSelecteds([])

        setSelecteds(list!)
      }

      const isSelected = (item: T) =>
        selecteds.includes(item);

      const handlePageChange = (newPage: number) => {
        const plus = () => {
          if (newPage > page! + 1)
            return getLastPage!()

          nextPage!()
        }

        const minus = () => {
          if (newPage < page! - 1)
            return getFirstPage!()

          prevPage!()
        }

        newPage > page! ? plus() :
          minus()
      }

      const onSort = (key: keyof T) => 
      {
        setOrderBy!(key)

        const newOrder = order == 'asc' ? 
          'desc' : 'asc'

        setOrder!(newOrder)
      }

      return (
        <Box className={className}>
          <TableContainer
            className={styles.tableContainer}>
            {selecteds.length > 0 &&
              <TableSelectedActions
                dense={dense}
                numSelected={selecteds.length}
                rowCount={list?.length ?? 0}
                onSelectAllRows={toggleSelectAll}
                actions={[]}
              />}

            <Table size={size}>
              <TableHeadCustom
                headLabel={columns}
                rowCount={list!.length}
                numSelected={selecteds.length}
                onSort={onSort}
                orderBy={orderBy}
                order={order}
                onSelectAllRows={toggleSelectAll}
              />

              <TableBody>
                {(list ?? []).map(row => (
                  renderTableRow({
                    element: row as T & { deleted: boolean },
                    isSelected: isSelected(row),
                    toggle: () => toggleSelected(row)
                  })
                ))}

                {/* <TableNoData isNotFound={isNotFound} /> */}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ position: 'relative' }} className="pagination">
            <TablePagination
              component="div"
              rowsPerPageOptions={rowsPerPageOptions ?? [5, 10, 25]}
              count={totalCount!}
              rowsPerPage={rowsPerPage!}
              page={page!}
              onPageChange={(_, newPage) =>
                handlePageChange(newPage)}

              onRowsPerPageChange={({ target: { value } }) =>
                setRowsPerPage!(Number(value))}

              showFirstButton
              showLastButton
            />

            <FormControlLabel
              control={<Switch checked={size == 'small'} onChange={() => setDense(!dense)} />}
              label="Denso"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Box>
      )
    }
  }
}

export interface TableAction {
  id: string;
  title: string;
  icon: JSX.Element;
  callback: Action<[]>;
}

interface TableSelectedActionsProps {
  dense: boolean;
  actions: TableAction[],
  rowCount: number;
  numSelected: number;
  onSelectAllRows?: Action<[boolean]>;
}

function TableSelectedActions({
  dense,
  actions = [],
  rowCount,
  numSelected,
  onSelectAllRows = () => { }
}: TableSelectedActionsProps) {
  const checkboxStyle = {
    paddingLeft: `${!dense ? 5 : 0}px`,
    paddingTop: `${!dense ? 7 : 8}px`
  }
  return (
    <Stack
      className="selecteds"
      direction="row"
      alignItems="center"
      sx={{
        px: 2,
        pl: 0,
        right: 8,
        zIndex: 9,
        height: 58,
        borderRadius: 1,
        position: 'absolute',
        bgcolor: 'primary.lighter',
        ...(dense && {
          pl: 1,
          height: 38,
        })
      }}
    >
      <Checkbox
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={(event) => onSelectAllRows(event.target.checked)}
        sx={checkboxStyle}
      />

      <Typography
        variant="subtitle1"
        sx={{
          ml: 2,
          flexGrow: 1,
          color: 'primary.main',
          ...(dense && {
            ml: 3,
          }),
        }}
      >
        {numSelected} selecionado(s)
      </Typography>

      <Stack spacing={1} direction="row">
        {actions.map(action =>
          <Tooltip
            key={action.id}
            title={action.title}
            onClick={action.callback}
          >
            {action.icon}
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
}