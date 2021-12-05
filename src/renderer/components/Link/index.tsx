import type { BoxProps } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

const Link: React.FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <Box
      component="a"
      sx={{
        cursor: 'pointer',
        transition: 'filter 250ms var(--animation-cubic-bezier)',
        '&:hover': {
          filter: 'brightness(0.75)',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

Link.displayName = 'Link';

export type LinkProps = BoxProps;
export default Link;
