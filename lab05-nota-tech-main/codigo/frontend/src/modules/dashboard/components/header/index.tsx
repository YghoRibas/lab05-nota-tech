import { AppBar, Avatar, Box, Stack, Toolbar, Typography, styled } from "@mui/material";
import { HEADER } from "src/config";
import Logo from "src/modules/default/components/logo";

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  height: HEADER.DASHBOARD_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  backgroundColor: theme.palette.background.default
}));

export default function DashboardHeader() {
  return (
    <RootStyle>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        <Typography
          sx={{
            color: 'black',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}>
            Nota Tech
        </Typography> 

        <Box sx={{ flexGrow: 1 }} />

        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="center" 
          style={{ color: 'black' }}
          spacing={{ xs: 0.5, sm: 1.5 }}>
          <Typography
            variant="button"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              Administrador
          </Typography> 

          <Avatar sx={{ mt: 1 }}/>
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}