import { Icon, IconifyIcon } from '@iconify/react';
import { Box, SxProps } from '@mui/material';

export interface IconifyProps {
  sx?: SxProps;
  icon: IconifyIcon | string;
  [other: string]: any;
}

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}