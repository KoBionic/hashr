import { Box, BoxProps, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(
  createStyles({
    a: {
      cursor: 'pointer',
      transition: 'filter 250ms var(--animation-cubic-bezier)',
      '&:hover': {
        filter: 'brightness(0.75)',
      },
    },
  }),
);

const Link: React.FC<LinkProps> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Box className={classes.a} component="a" {...rest}>
      {children}
    </Box>
  );
};

Link.displayName = 'Link';

export type LinkProps = BoxProps;
export default Link;
