import { stat } from 'fs';
import { promisify } from 'util';
const statAsync = promisify(stat);

/**
 * Determines whether given path is a file or not.
 *
 * @param path the path to verify
 * @returns true if is a file, false otherwise
 */
async function isFile(path: string): Promise<boolean> {
    const stats = await statAsync(path);
    return stats.isFile();
}

export { isFile };
