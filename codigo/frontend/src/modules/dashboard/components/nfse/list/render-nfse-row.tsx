import { Checkbox, Divider, IconButton, MenuItem, Popover, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from "src/modules/@shared/components/iconify";
import Label from 'src/modules/@shared/components/label';
import { Action } from "src/modules/@shared/domain/utils/func";
import { PATH_DASHBOARD } from 'src/modules/dashboard/dashboard-paths';
import { Nfse, nfseStatus } from 'src/modules/dashboard/domain/entities/nfse';
import nfseService from 'src/modules/dashboard/services/nfse-service';
import './render-nfse-row.module.scss';
import moment from 'moment';
import { useSnackbar } from 'notistack';

export interface ContextMenuProps {
  top: number;
  left: number;
  scrollTop: number
}

export interface RenderNfseRowProps {
  element: Nfse & { deleted: boolean };
  isSelected?: boolean;
  toggle?: Action<[]>;
}

export function RenderNfseRow({ element, isSelected, toggle }: RenderNfseRowProps) {
  const [openMenu, setOpenMenuActions] = useState<Element>()
  const [contextMenu, setContextMenuPos] = useState<ContextMenuProps>()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const scrollBack = () => {
    if (!contextMenu) return;

    const removeListener = (cb: Action<[Event]>) => {
      document.removeEventListener('scroll', cb);
    }

    const goBack = () => {
      document.documentElement.scrollTop = contextMenu.scrollTop;
      removeListener(goBack);
    }

    document.addEventListener('scroll', goBack);

    setTimeout(() => removeListener(goBack), 1000);
  }

  const handleOpenMenu = (event: React.SyntheticEvent) => {
    setOpenMenuActions(event.currentTarget);
    setContextMenuPos(undefined);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(undefined);
    setContextMenuPos(undefined);
    scrollBack();
  };


  const handleContextMenu = (e: React.MouseEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    setContextMenuPos({ top: e.clientY, left: e.clientX, scrollTop: document.documentElement.scrollTop });
    setOpenMenuActions(undefined);
  }

  // const onEditRow = () => 
  //   navigate(PATH_DASHBOARD.nfse.edit(element.id))

  const onEditRow = () =>
    enqueueSnackbar({ 
      variant: 'error',
      message: `Funcionalidade pendente de implementacão`,
      transitionDuration: 300 
    })

  // const onDeleteRow = () => {
  //   nfseService.delete(element)
  //   element.deleted = true
  // }

  const onDeleteRow = () =>
    enqueueSnackbar({ 
      variant: 'error',
      message: `Funcionalidade pendente de implementacão`,
      transitionDuration: 300 
    })

  const onViewRow = () =>
    enqueueSnackbar({ 
      variant: 'error',
      message: `Funcionalidade pendente de implementacão`,
      transitionDuration: 300 
    })

  const onCancelRow = () =>
  {
    nfseService.cancel(element)
    element.status = 'CANCELADO'
  }
    
  const handleClick = ({ detail }: React.MouseEvent<HTMLTableRowElement>) => {
    if (detail >= 2)
    onEditRow();
  }

  const actions = <>
    <MenuItem
      sx={{ px: 1 }}
      onClick={() => {
        onViewRow();
        handleCloseMenu();
      }}
    >
      <Iconify width={20} height={20} sx={{ mr: '10px' }} icon={'carbon:cube-view'} />
      Visualizar
    </MenuItem>
    <MenuItem
      sx={{ px: 1 }}
      onClick={() => {
        onEditRow()
        handleCloseMenu()
      }}
    >
      <Iconify width={20} height={20} sx={{ mr: '10px' }} icon={'eva:edit-fill'} />
      Editar
    </MenuItem>

    <Divider />

    <MenuItem
      onClick={() => {
        onCancelRow();
        handleCloseMenu();
      }}
      sx={{ px: 1 }}
    >
      <Iconify width={20} height={20} sx={{ mr: '10px' }} icon={'mdi:cancel-bold'} />
      Cancelar
    </MenuItem>

    <MenuItem
      onClick={() => {
        onDeleteRow();
        handleCloseMenu();
      }}
      sx={{ px: 1, color: 'error.main' }}
    >
      <Iconify width={20} height={20} sx={{ mr: '10px' }} icon={'eva:trash-2-outline'} />
      Deletar
    </MenuItem>
  </>

  if(element.deleted)
    return <></>

  const getColorStatus = () => 
    element.status == 'ENVIADO' ? 'success' : 'warning'

  const competency = 
    moment(element.identificacao.competencia, 'YYYY-MM-DD')
      .format('DD/MM/YYYY')  

  return (
    <TableRow
      hover
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <TableMoreMenu
        className="nfse-actions"
        open={contextMenu}
        actions={actions}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
      </TableMoreMenu>

      <TableCell padding="checkbox">
        <Checkbox
          checked={!!isSelected}
          onClick={() => toggle!()}
        />
      </TableCell>

      <TableCell>
        {element.identificacao.numero}
      </TableCell>

      <TableCell>
        <Label
          color={getColorStatus()}
          sx={{ textTransform: 'capitalize' }}
        >
          {nfseStatus(element)}
        </Label>
      </TableCell>

      <TableCell>
        {element.tomador.razaosocial.toUpperCase()}
      </TableCell>

      <TableCell>
        {element.prestador.razaosocial.toUpperCase()}
      </TableCell>

      <TableCell>
        {competency}
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          className="nfse-actions"
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={actions}
        />
      </TableCell>
    </TableRow>
  )
}

export interface TableMoreMenuProps {
  actions: JSX.Element;
  open: any;
  onClose: Action<[any]>;
  onOpen?: Action<[any]>;
  [other: string]: any;
}

export function TableMoreMenu({ actions, open, onClose, onOpen, ...other }: TableMoreMenuProps) {
  const isElement = open instanceof HTMLElement;

  return (
    <>
      {onOpen && <IconButton onClick={onOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>}

      <Popover
        open={Boolean(open)}
        onClose={onClose}
        {...(isElement && { anchorEl: open })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              p: 1,
              width: 200,
              overflow: 'inherit'
            },
          }
        }}
        {...other}>
        {/* <ArrowStyle arrow="right-top" /> */}

        {actions}
      </Popover>
    </>
  );
}