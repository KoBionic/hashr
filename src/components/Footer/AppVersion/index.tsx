import { Box } from '@material-ui/core';
import Link from 'components/Link';
import React from 'react';

const AppVersion: React.FC<AppVersionProps> = ({ onClick, version }) => {
  return (
    <Link onClick={onClick} position="absolute" right={12}>
      <Box
        borderBottom="1px dotted var(--md-secondary-white)"
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
