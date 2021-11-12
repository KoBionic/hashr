import { Box, colors, createStyles, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import {
  CheckCircleOutlined as CheckCircleOutlinedIcon,
  Close as CloseIcon,
  ErrorOutlineOutlined as ErrorOutlineOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  SvgIconComponent,
  WarningOutlined as WarningOutlinedIcon,
} from '@material-ui/icons';
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

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      bottom: theme.spacing(6),
      left: theme.spacing(2),
    },
    content: {
      color: colors.common.white,
      fontSize: theme.spacing(2),
      fontWeight: 'bold',
    },
    default: {
      background: 'var(--md-secondary-white)',
    },
    error: {
      background: 'var(--md-primary-red)',
    },
    info: {
      background: 'var(--md-secondary-blue)',
    },
    success: {
      background: 'var(--md-primary-teal)',
    },
    warning: {
      background: 'var(--md-primary-orange)',
    },
  }),
);

const ToastsProvider: React.FC = ({ children }) => {
  const classes = useStyles();
  const [toast, setToast] = useState<ToastsContext>(null);
  const [isOpened, setIsOpened] = useState(false);
  const handleClose = () => setIsOpened(false);
  const contentClasses = [classes.content, classes[toast?.type]].filter(x => x).join(' ');
  const Icon = useMemo(() => iconsMapping[toast?.type], [toast]);

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
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={5000}
        className={classes.root}
        ContentProps={{
          className: contentClasses,
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
      ></Snackbar>
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
