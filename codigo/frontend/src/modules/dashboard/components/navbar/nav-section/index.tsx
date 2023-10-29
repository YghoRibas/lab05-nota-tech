import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import CloseIcon from '@mui/icons-material/Close'
import { memo, useState } from 'react';
import { Box, Divider, Drawer, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { NavListRoot } from './nav-list';
import { NavItem } from '../nav-config';
import { NAVBAR } from 'src/config';
import { ListItemStyle } from './style';
import { NavItemContent } from './nav-item';
import { Action } from 'src/modules/@shared/domain/utils/func';
import { useDispatch, useSelector } from 'src/redux/store';
import { setStatus } from 'src/redux/slices/setting';

export interface NavSectionHorizontalProps {
  navConfig: NavItem[];
}

export function NavSectionHorizontal({ navConfig }: NavSectionHorizontalProps) {
  const [drawerStatus, setDrawerStatus] = useState(false);

  const handleDrawer = () =>
    setDrawerStatus(!drawerStatus)

  return (
    <Stack
      direction="row"
      justifyContent="start"
      sx={{
        bgcolor: 'background.neutral',
        borderRadius: 1,
        px: 0.5,
        py: 1,
        height: `${NAVBAR.DASHBOARD_ITEM_HEIGHT}px`
      }}>
      {navConfig.map(item => (
        <NavListRoot
          key={item.title}
          list={item}
        />
      ))}

      <SettingDrawer
        open={drawerStatus}
        onClose={handleDrawer}
      />

      <ListItemStyle onClick={handleDrawer}>
        <NavItemContent
          icon={<DisplaySettingsIcon style={{ width: '22px' }} />}
          title={'configurações'}
        />
      </ListItemStyle>
    </Stack>
  );
}

export interface SettingDrawerProps {
  open: boolean;
  onClose: Action<[]>;
}

export function SettingDrawer({ open, onClose }: SettingDrawerProps) {
  const status = useSelector(state => state.setting.status)

  const dispatch = useDispatch()

  const saveStatus = (status: 'online' | 'offline') => 
    dispatch(setStatus(status))

  const drawerContent = (
    <Box sx={{ width: '25vw' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '500', p: 2 }}>
          Configurações
        </Typography>

        <CloseIcon 
          onClick={onClose}
          sx={{ color: 'red', width: '25px', cursor: 'pointer', mr: 2 }} 
        />
      </Box>

      <Divider />

      <Typography sx={{ pl: 2, pt: 2, mb: 1, fontFamily: 'monospace', color: 'grey', fontWeight: 'bold' }}>
        STATUS
      </Typography>

      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="Platform"
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          width: '100%',
          px: 2
        }}
        onChange={(_, value) => saveStatus(value)}
      >
        <ToggleButton
          sx={{ width: '50%' }} 
          value="online"
          selected={status == 'online'}
        >
            ONLINE
        </ToggleButton>

        <ToggleButton 
          sx={{ width: '50%' }} 
          value="offline"
          selected={status == 'offline'}
        >
            OFFLINE
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        slotProps: {
          backdrop: {
            sx: {
              background: 'rgba(0, 0, 0, 0.2)'
            }
          }
        }
      }}
    >
      {drawerContent}
    </Drawer>
  )
}

export default memo(NavSectionHorizontal);