import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface LogoProps {
  disabledLink?: boolean;
  sx?: any;
  url?: string;
}

export default function Logo({ disabledLink = false, url, sx }: LogoProps) {
  const logo = (
    <Box sx={{ height: 40, ...sx }}>
      <Box component="img" src={url ?? '/logo/header-logo.png'} />
      {/* <Typography 
        variant='h4' 
        sx={{ color: 'black' }}
        fontFamily="cursive">
          NOTA TECH
      </Typography> */}
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <RouterLink style={{ textDecoration: 'none' }} to="/">
      {logo}
    </RouterLink>
  );
}