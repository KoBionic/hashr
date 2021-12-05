import { contextBridge, ipcRenderer, shell } from 'electron';
import Event from '../shared/models/Event';
import { getAlgorithms, hashFile } from './utils/crypto';
import { getFileInfo, isFile as isValidFile } from './utils/fs';

contextBridge.exposeInMainWorld('api', {
  crypto: {
    getAlgorithms,
    hashFile,
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
    isValidFile,
    getFileInfo,
    onOpenFile: (callback: (...params: unknown[]) => void) => {
      const listener = (...args: unknown[]) => {
        // Remove event when it comes from webContents.send
        if (args.length > 1) args.shift();
        callback(...args);
      };
      ipcRenderer.on(Event.FILE_OPEN, listener);

      return () => {
        ipcRenderer.removeListener(Event.FILE_OPEN, listener);
      };
    },
    removeAllListeners: () => {
      ipcRenderer.removeAllListeners(Event.FILE_OPEN);
    },
  },
  shell: {
    openInBrowser: (url: string) => shell.openExternal(url),
  },
});
