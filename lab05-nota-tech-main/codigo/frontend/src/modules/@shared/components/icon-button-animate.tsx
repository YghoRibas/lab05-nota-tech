import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Box, IconButton } from '@mui/material';

// ----------------------------------------------------------------------

export interface IconButtonAnimateProps {
  size: "medium" | "small" | "large";
  [other: string]: any;
}

export default forwardRef<HTMLButtonElement, React.PropsWithChildren<IconButtonAnimateProps>>
(({ children, size = 'medium', ...other }, ref) => (
  <AnimateWrap size={size}>
    <IconButton size={size} ref={ref} {...other}>
      {children}
    </IconButton>
  </AnimateWrap>
));

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 }
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 }
};

AnimateWrap.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export interface AnimateWrapProps {
  size: "medium" | "small" | "large";
  children: React.ReactNode;
}

function AnimateWrap({ size, children }: AnimateWrapProps) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex'
      }}
    >
      {children}
    </Box>
  );
}