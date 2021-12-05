import { ipcRenderer } from 'electron';
import { stat } from 'fs/promises';
import Event from '../../shared/models/Event';
import TargetFile from '../../shared/models/TargetFile';

/**
 * Retrieves information from given file & sends an event with the result.
 *
 * @param filePath the path of the file to scan
 */
export async function getFileInfo(filePath: string): Promise<void> {
  const file = await TargetFile.from(filePath);
  ipcRenderer.emit(Event.FILE_OPEN, file);
}

/**
 * Returns true if given path is a file & false otherwise.
 *
 * @param filePath the path of the file to check
 */
export async function isFile(filePath: string): Promise<boolean> {
  let isValid = false;

  try {
    const stats = await stat(filePath);
    isValid = stats.isFile();
  } catch (err) {
    console.error(err);
  }

  return isValid;
}
