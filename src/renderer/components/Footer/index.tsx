import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import React from 'react';
import config from 'renderer/config';
import useAPI from 'renderer/hooks/useAPI';
import AppName from './AppName';
import AppVersion from './AppVersion';
import Company from './Company';

const Footer: React.FC = () => {
  const api = useAPI();
  const { companyURL, releaseURL, repositoryURL, version } = config;

  const handleOpenInBrowser = (url: string) => () => api.shell.openInBrowser(url);

  return (
    <Box
      borderTop="1px solid #3f3f3f"
      bottom={0}
      left={0}
      paddingY={0.25}
      position="absolute"
      right={0}
    >
      <Box alignItems="center" display="flex" justifyContent="center" position="relative">
        <AppName onClick={handleOpenInBrowser(repositoryURL)} />
        <Box
          borderBottom="1px dotted"
          borderColor={grey[800]}
          color="#5f5f5f"
          fontSize={12}
          fontWeight="bold"
          marginX={1.5}
        >
          is brought to you by
        </Box>
        <Company onClick={handleOpenInBrowser(companyURL)} />
        <AppVersion onClick={handleOpenInBrowser(`${releaseURL}/${version}`)} version={version} />
      </Box>
    </Box>
  );
};

Footer.displayName = 'Footer';

export default Footer;
