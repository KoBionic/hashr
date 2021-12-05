import type { SvgIconComponent } from '@mui/icons-material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import Box from '@mui/material/Box';
import blue from '@mui/material/colors/blue';
import common from '@mui/material/colors/common';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';
import teal from '@mui/material/colors/teal';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import useTheme from '@mui/material/styles/useTheme';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ToastType = 'default' | 'error' | 'info' | 'success' | 'warning';
type ToastsContext = { msg: string; type: ToastType };
const ToastsContext = createContext<Dispatch<SetStateAction<ToastsContext>>>(() => undefined);

const iconsMapping: Record<ToastType, SvgIconComponent> = {
  default: null,
  error: ErrorOutlineOutlinedIcon,
  info: InfoOutlinedIcon,
  success: CheckCircleOutlinedIcon,
  warning: WarningOutlinedIcon,
};

const ToastsProvider: React.FC = ({ children }) => {
  const [toast, setToast] = useState<ToastsContext>(null);
  const [isOpened, setIsOpened] = useState(false);
  const handleClose = () => setIsOpened(false);
  const Icon = useMemo(() => iconsMapping[toast?.type], [toast]);
  const theme = useTheme();

  let backgroundColor: string;
  switch (toast?.type) {
    case 'error':
      backgroundColor = red[500];
      break;

    case 'info':
      backgroundColor = blue[900];
      break;

    case 'success':
      backgroundColor = teal[500];
      break;

    case 'warning':
      backgroundColor = orange[500];
      break;

    default:
      backgroundColor = common.white;
  }

  useEffect(() => {
    if (toast) setIsOpened(true);
  }, [toast]);

  return (
    <ToastsContext.Provider value={setToast}>
      <Snackbar
        action={
          <IconButton color="inherit" onClick={handleClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        autoHideDuration={5000}
        ContentProps={{
          sx: {
            background: backgroundColor,
            color: common.white,
            fontSize: theme.spacing(2),
            fontWeight: 'bold',
          },
        }}
        open={isOpened}
        onClose={handleClose}
        message={
          <Box alignItems="center" display="flex">
            {Icon && <Icon fontSize="small" />}
            <Box component="span" marginLeft={1}>
              {toast?.msg}
            </Box>
          </Box>
        }
      />
      {children}
    </ToastsContext.Provider>
  );
};

ToastsProvider.displayName = 'ToastsProvider';

/**
 * Returns the Toasts context allowing display of a toast.
 */
export function useToasts() {
  return useContext(ToastsContext);
}
export default ToastsProvider;
