import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';
import React from 'react';
import Link from 'renderer/components/Link';

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
