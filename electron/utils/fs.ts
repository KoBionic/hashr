import { stat as legacyStat } from 'fs';
import { promisify } from 'util';
const stat = promisify(legacyStat);

/**
 * Returns true if given path is a file & false otherwise.
 *
 * @param filePath the path of the file to check
 */
async function isFile(filePath: string) {
  let isValid = false;
  try {
    const stats = await stat(filePath);
    isValid = stats.isFile();
  } catch {}
  return isValid;
}

export { isFile };
