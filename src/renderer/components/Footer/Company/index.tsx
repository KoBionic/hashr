import Box from '@mui/material/Box';
import common from '@mui/material/colors/common';
import React from 'react';
import Link from 'renderer/components/Link';
import KobionicIcon from 'renderer/components/svgs/KoBionic';

const Company: React.FC<CompanyProps> = ({ onClick }) => {
  return (
    <Link onClick={onClick}>
      <Box alignItems="center" display="flex" fontFamily="Maken" fontSize={18} fontWeight="bold">
        <KobionicIcon height={20} width={20} />
        <Box color={common.white} component="span" marginLeft={0.5}>
          KoBionic
        </Box>
      </Box>
    </Link>
  );
};

Company.displayName = 'Company';

export type CompanyProps = {
  onClick: () => void;
};
export default Company;
