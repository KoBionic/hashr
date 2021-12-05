import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import React from 'react';
import Link from 'renderer/components/Link';

const AppVersion: React.FC<AppVersionProps> = ({ onClick, version }) => {
  return (
    <Link onClick={onClick} position="absolute" right={12}>
      <Box
        borderBottom="1px dotted"
        borderColor={grey[800]}
        color="#5f5f5f"
        fontSize={12}
        fontWeight="bold"
      >
        <Box component="span">{version}</Box>
      </Box>
    </Link>
  );
};

AppVersion.displayName = 'AppVersion';

export type AppVersionProps = {
  onClick: () => void;
  version: string;
};
export default AppVersion;
