import { Box } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useFile } from 'components/providers/FileProvider';
import useAPI from 'hooks/useAPI';
import useDrag from 'hooks/useDrag';
import React, { DragEvent, useEffect, useState } from 'react';

const DropZone: React.FC<DropZoneProps> = ({ active }) => {
  const api = useAPI();
  const isDragged = useDrag();
  const [droppedFile, setDroppedFile] = useState<APIFile>();
  const [, setFile] = useFile();

  const handleDropFile = (e: DragEvent) => setDroppedFile(e.dataTransfer.files[0] as APIFile);

  useEffect(() => {
    (async () => {
      if (droppedFile) {
        const isValid = await api.fs.isValidFile(droppedFile.path);
        if (isValid) setFile(droppedFile);
      }
    })();
  }, [droppedFile]);

  return (
    <Box
      alignItems="center"
      bgcolor="rgba(var(--md-secondary-blue-rgb), 0.5)"
      border="1px dashed var(--md-primary-blue)"
      bottom={-16}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      left={-16}
      onDrop={handleDropFile}
      position="absolute"
      right={-16}
      style={{
        opacity: isDragged ? 1 : 0,
        pointerEvents: active && isDragged ? 'all' : 'none',
        transition: 'all 250ms var(--animation-cubic-bezier)',
      }}
      top={-8}
      zIndex={isDragged ? 1 : -1}
    >
      <GetAppIcon style={{ fontSize: 48 }} />
    </Box>
  );
};

DropZone.displayName = 'DropZone';

export type DropZoneProps = {
  active: boolean;
};
export default DropZone;
