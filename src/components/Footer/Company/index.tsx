import { Box } from '@material-ui/core';
import Link from 'components/Link';
import KobionicIcon from 'components/svgs/KoBionic';
import React from 'react';

const Company: React.FC<CompanyProps> = ({ onClick }) => {
  return (
    <Link onClick={onClick}>
      <Box alignItems="center" display="flex" fontFamily="Maken" fontSize={18} fontWeight="bold">
        <KobionicIcon height={20} width={20} />
        <Box color="var(--md-primary-white)" component="span" marginLeft={0.5}>
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
