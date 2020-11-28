import { contextBridge, ipcRenderer, shell } from 'electron';
import Event from './models/Event';
import { getAlgorithmsInfo, hashFile } from './utils/crypto';
import { isFile } from './utils/fs';

contextBridge.exposeInMainWorld('api', {
  crypto: {
    getAlgorithms: getAlgorithmsInfo,
    hashFile: (filePath: string, algorithm: string, comparisonString: string) => {
      hashFile(filePath, algorithm, comparisonString);
    },
    onError: (callback: (...params: unknown[]) => void) => {
      const listener = (...args: unknown[]) => callback(...args);
      ipcRenderer.on(Event.HASH_FILE_ERROR, listener);
      return () => {
        ipcRenderer.removeListener(Event.HASH_FILE_ERROR, listener);
      };
    },
    onProgress: (callback: (...params: unknown[]) => void) => {
      const listener = (...args: unknown[]) => callback(...args);
      ipcRenderer.on(Event.HASH_FILE_PROGRESS, listener);
      return () => {
        ipcRenderer.removeListener(Event.HASH_FILE_PROGRESS, listener);
      };
    },
    removeAllListeners: () => {
      ipcRenderer.removeAllListeners(Event.HASH_FILE_ERROR);
      ipcRenderer.removeAllListeners(Event.HASH_FILE_PROGRESS);
    },
  },
  fs: {
    isValidFile: async (filePath: string) => {
      const isValid = await isFile(filePath);
      return isValid;
    },
  },
  shell: {
    openInBrowser: (url: string) => shell.openExternal(url),
  },
});
