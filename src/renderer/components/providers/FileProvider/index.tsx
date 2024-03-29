import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import TargetFile from 'shared/models/TargetFile';

type FileContext = [TargetFile, Dispatch<SetStateAction<TargetFile>>];
const FileContext = createContext<FileContext>([null, () => undefined]);

const FileProvider: React.FC = ({ children }) => {
  const [file, setFile] = useState<TargetFile>(null);

  return <FileContext.Provider value={[file, setFile]}>{children}</FileContext.Provider>;
};

FileProvider.displayName = 'FileProvider';

/**
 * Returns the File context that has the same signature as React.useState.
 */
export function useFile() {
  return useContext(FileContext);
}
export default FileProvider;
