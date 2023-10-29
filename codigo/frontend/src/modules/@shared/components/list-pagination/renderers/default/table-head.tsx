import { Box, Checkbox, SxProps, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { Action } from 'src/modules/@shared/domain/utils/func';

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export interface TableHeadCustomProps {
  onSort?: Action<[any]>;
  orderBy?: any;
  headLabel: any[];
  rowCount?: number;
  numSelected?: number;
  onSelectAllRows?: Action<[any]>;
  order?: 'asc' | 'desc';
  sx?: SxProps;
}

export default function TableHeadCustom({
  order = 'desc',
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
}: TableHeadCustomProps) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {onSelectAllRows && (
          <TableCell padding="checkbox" className="selectAll">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) => onSelectAllRows(event.target.checked)}
            />
          </TableCell>
        )}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.key ?? headCell.label}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.key ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth, fontWeight: 'bold' }}
          >
            {onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.key}
                direction={orderBy === headCell.key ? order : 'asc'}
                onClick={() => onSort(headCell.key)}
                sx={{ textTransform: 'capitalize' }}
              >
                {headCell.label}

                {orderBy === headCell.key ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === 'desc' ? 'ordenado descendente' : 'ordenado ascendente'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}