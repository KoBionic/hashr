import GetAppIcon from '@mui/icons-material/GetApp';
import Box from '@mui/material/Box';
import blue from '@mui/material/colors/blue';
import React, { DragEvent, useEffect, useState } from 'react';
import { useFile } from 'renderer/components/providers/FileProvider';
import useAPI from 'renderer/hooks/useAPI';
import useDrag from 'renderer/hooks/useDrag';
import TargetFile from 'shared/models/TargetFile';

const DropZone: React.FC<DropZoneProps> = ({ active }) => {
  const api = useAPI();
  const isDragged = useDrag();
  const [droppedFile, setDroppedFile] = useState<TargetFile>();
  const [, setFile] = useFile();

  const handleDrop = (e: DragEvent) => api.fs.getFileInfo(e.dataTransfer.files[0].path);

  useEffect(() => {
    (async () => {
      if (droppedFile) {
        const isValid = await api.fs.isValidFile(droppedFile.path);
        if (isValid) setFile(droppedFile);
      }
    })();
  }, [droppedFile]);

  useEffect(() => {
    return api.fs.onOpenFile(file => setDroppedFile(file));
  }, []);

  return (
    <Box
      alignItems="center"
      bgcolor="rgba(var(--md-secondary-blue-rgb), 0.5)"
      border="1px dashed"
      borderColor={blue[500]}
      bottom={-16}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      left={-16}
      onDrop={handleDrop}
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
      <GetAppIcon sx={{ fontSize: 48 }} />
    </Box>
  );
};

DropZone.displayName = 'DropZone';

export type DropZoneProps = {
  active: boolean;
};
export default DropZone;
