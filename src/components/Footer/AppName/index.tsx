import { Box, useTheme } from '@material-ui/core';
import Link from 'components/Link';
import React from 'react';

const AppName: React.FC<AppNameProps> = ({ onClick }) => {
  const theme = useTheme();

  return (
    <Link onClick={onClick}>
      <Box fontFamily="RussianQuality" fontSize={20} fontWeight="bold">
        <Box color={theme.palette.secondary.main} component="span">
          Hash
        </Box>
        <Box color={theme.palette.primary.main} component="span">
          R
        </Box>
      </Box>
    </Link>
  );
};

AppName.displayName = 'AppName';

export type AppNameProps = {
  onClick: () => void;
};
export default AppName;
