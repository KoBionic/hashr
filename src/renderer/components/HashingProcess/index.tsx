import Box from '@mui/material/Box';
import blue from '@mui/material/colors/blue';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';
import teal from '@mui/material/colors/teal';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import bytes from 'bytes';
import React, { useEffect, useState } from 'react';
import { useAlgorithms } from 'renderer/components/providers/AlgorithmsProvider';
import { useFile } from 'renderer/components/providers/FileProvider';
import { useToasts } from 'renderer/components/providers/ToastsProvider';
import useAPI from 'renderer/hooks/useAPI';
import Digest from 'shared/models/Digest';

const HashingProcess: React.FC<HashingProcessProps> = ({ comparison, onProcess }) => {
  const [, algorithm] = useAlgorithms();
  const [file] = useFile();
  const api = useAPI();
  const showToast = useToasts();
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [digest, setDigest] = useState<Digest>(null);

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
          setDigest(d);
          if (comparison) {
            d.equality
              ? showToast({ msg: 'Hashes match', type: 'success' })
              : showToast({ msg: 'Hashes mismatch', type: 'warning' });
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
          color="secondary"
          sx={
            hasError
              ? {
                  progressError: {
                    backgroundColor: '#611a15',
                    '& div': {
                      backgroundColor: red[500],
                    },
                  },
                }
              : {}
          }
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
        <Input disabled={!digest} value={digest?.duration || ''} />
        {comparison && (
          <>
            <InputLabel>Compare To</InputLabel>
            <Input value={comparison || ''} />
          </>
        )}
        <InputLabel>Hash</InputLabel>
        <Input
          disabled={!digest}
          style={{
            color: digest
              ? comparison
                ? digest.equality
                  ? teal[500]
                  : orange[500]
                : blue[500]
              : 'inherit',
          }}
          value={digest?.hash || ''}
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
