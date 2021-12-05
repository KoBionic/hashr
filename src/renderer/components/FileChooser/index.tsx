import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import bytes from 'bytes';
import React, { ChangeEvent } from 'react';
import TargetFile from 'shared/models/TargetFile';
import DropZone from './DropZone';

const FileChooser: React.FC<FileChooserProps> = ({
  active,
  defaultValue = '',
  file,
  onComparisonChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onComparisonChange(e.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" position="relative" width="100%">
      <InputLabel>Compare To</InputLabel>
      <Input onChange={handleChange} value={defaultValue} />
      <InputLabel>Name</InputLabel>
      <Input disabled={!file} value={file?.name || ''} />
      <InputLabel>Path</InputLabel>
      <Input disabled={!file} value={file?.path || ''} />
      <InputLabel>Size</InputLabel>
      <Input disabled={!file} value={(file && bytes(file.size)) || ''} />
      <InputLabel>MIME Type</InputLabel>
      <Input disabled={!file} value={file?.type || ''} />
      <InputLabel>Last Modified</InputLabel>
      <Input
        margin="dense"
        disabled={!file}
        value={(file && new Date(file.lastModified).toUTCString()) || ''}
      />
      <DropZone active={active} />
    </Box>
  );
};

FileChooser.displayName = 'FileChooser';

export type FileChooserProps = {
  active: boolean;
  defaultValue: string;
  file: TargetFile;
  onComparisonChange: (value: string) => void;
};
export default FileChooser;
