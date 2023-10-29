import { Helmet, MetaProps } from 'react-helmet-async';
import React, { forwardRef, useRef } from 'react';
import { Box } from '@mui/material';

export interface PageProps {
  title: string;
  metas?: MetaProps[];
}

export default forwardRef<HTMLDivElement, React.PropsWithChildren<PageProps>>
(({ children, title = '', metas, ...other }, ref) => {

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {metas?.map((meta, i) => (
          <meta key={i} {...meta} />
        ))}
      </Helmet>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
});