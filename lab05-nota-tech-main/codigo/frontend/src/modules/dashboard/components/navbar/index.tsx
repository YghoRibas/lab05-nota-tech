import { memo } from 'react';
import { styled } from '@mui/material/styles';
import { Container, AppBar } from '@mui/material';
import { NavSectionHorizontal } from './nav-section';
import useNavConfig from './nav-config';
import { HEADER, NAVBAR } from 'src/config';

const RootStyle = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: '100%',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  //boxShadow: theme.customShadows.z8,
  backgroundColor: theme.palette.background.default,
  top: HEADER.DASHBOARD_HEIGHT,
  height: NAVBAR.DASHBOARD_HEIGHT
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  const navConfig = useNavConfig()

  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={navConfig} />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
