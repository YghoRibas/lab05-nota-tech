import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./header";
import NavbarHorizontal from "./navbar"
import { CONTENT, HEADER, NAVBAR } from "src/config";

export default function DashboardIndex() {
  const totalHeight = HEADER.DASHBOARD_HEIGHT + 
                      NAVBAR.DASHBOARD_HEIGHT +
                      CONTENT.OFFSET_TOP;

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader/>

      <NavbarHorizontal />

      <Box 
        sx={{ 
          marginTop: `${totalHeight}px`,
          width: '70vw',
          mx: 'auto'
        }}>
        <Outlet />
      </Box>
    </Box>
  );
}
