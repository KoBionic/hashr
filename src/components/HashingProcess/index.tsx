import {
  Box,
  createStyles,
  Input,
  InputLabel,
  LinearProgress,
  makeStyles,
} from '@material-ui/core';
import bytes from 'bytes';
import { useAlgorithms } from 'components/providers/AlgorithmsProvider';
import { useFile } from 'components/providers/FileProvider';
import { useToasts } from 'components/providers/ToastsProvider';
import useAPI from 'hooks/useAPI';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(
  createStyles({
    progressError: {
      backgroundColor: '#611a15',
      '& div': {
        backgroundColor: 'var(--md-primary-red)',
      },
    },
  }),
);

const HashingProcess: React.FC<HashingProcessProps> = ({ comparison, onProcess }) => {
  const classes = useStyles();
  const [, algorithm] = useAlgorithms();
  const [file] = useFile();
  const api = useAPI();
  const showToast = useToasts();
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hashResult, setHashResult] = useState<DigestResult>(null);

  useEffect(() => {
    return api.crypto.onError(err => {
      setHasError(true);
      onProcess(false);
      showToast({ msg: err.message, type: 'error' });
    });
  }, []);

  useEffect(() => {
    return api.crypto.onProgress((p, d) => {
      if (d) {
        setTimeout(() => {
          onProcess(false);
          setHashResult(d);
          if (comparison) {
            comparison === d.hash
              ? showToast({ msg: 'Hashes are equal', type: 'success' })
              : showToast({ msg: 'Hashes are different', type: 'warning' });
          } else {
            showToast({ msg: 'Hash generated', type: 'info' });
          }
        }, 500);
      }
      setProgress(p);
    });
  }, []);

  useEffect(() => {
    api.crypto.hashFile(file.path, algorithm, comparison);
    onProcess(true);
  }, []);

  return (
    <Box width="100%">
      <Box marginBottom={2}>
        <LinearProgress
          className={(hasError && classes.progressError) || ''}
          color="secondary"
          value={progress}
          variant="determinate"
        />
      </Box>
      <Box alignItems="stretch" display="flex" flexDirection="column">
        <InputLabel>Algorithm</InputLabel>
        <Input value={algorithm.toUpperCase()} />
        <InputLabel>File</InputLabel>
        <Input value={file.name} />
        <InputLabel>Size</InputLabel>
        <Input value={bytes(file.size)} />
        <InputLabel>Duration</InputLabel>
        <Input disabled={!hashResult} value={hashResult?.duration || ''} />
        {comparison && (
          <>
            <InputLabel>Compare To</InputLabel>
            <Input value={comparison || ''} />
          </>
        )}
        <InputLabel>Hash</InputLabel>
        <Input
          disabled={!hashResult}
          style={{
            color: hashResult
              ? comparison
                ? comparison === hashResult.hash
                  ? 'var(--md-primary-teal)'
                  : 'var(--md-primary-orange)'
                : 'var(--md-primary-blue)'
              : 'inherit',
          }}
          value={hashResult?.hash || ''}
        />
      </Box>
    </Box>
  );
};

HashingProcess.displayName = 'HashingProcess';

export type HashingProcessProps = {
  comparison?: string;
  onProcess: (processing: boolean) => void;
};
export default HashingProcess;
