import { createHash, getHashes } from 'crypto';
import { ipcRenderer } from 'electron';
import { createReadStream, stat as statLegacy } from 'fs';
import ms from 'ms';
import path from 'path';
import { promisify } from 'util';
import Event from '../models/Event';
const stat = promisify(statLegacy);

/**
 * Returns information about supported hashing algorithms & the default one.
 */
function getAlgorithmsInfo() {
  const algorithms = getHashes();
  const defaultAlgorithm = algorithms.find(a => a === 'sha256') || algorithms[0];
  return {
    algorithms,
    defaultAlgorithm,
  };
}

/**
 * Generates a message digest for the specified file. The resulting HashResult object contains several
 * information such as used algorithm, process duration and the message digest.
 *
 * @param fileToDigest the path of the file to digest
 * @param hashingAlgorithm the hashing algorithm to use
 * @param comparisonString the hash to compare to
 */
async function hashFile(fileToDigest: string, hashingAlgorithm: string, comparisonString?: string) {
  try {
    const filePath = path.resolve(fileToDigest);
    const fileSize = (await stat(filePath)).size;
    const metricsStart = Date.now();

    // Set hashing algorithm if in enum, else use default one
    const { algorithms, defaultAlgorithm } = getAlgorithmsInfo();
    const lowercaseAlg = hashingAlgorithm.toLowerCase();
    const algorithm = algorithms.find(a => a === lowercaseAlg) || defaultAlgorithm;

    // Create hashing engine from the algorithm, forced to lowercase for better recognition
    const hasher = createHash(algorithm.toLowerCase());

    // Process read stream and resolve promise when end of stream is reached
    const input = createReadStream(filePath);

    // Store previous progress value to prevent emitting an updateProgress event on every stream input
    let previousProgress = 0;

    input
      .on('error', err => {
        input.close();
        ipcRenderer.emit(Event.HASH_FILE_ERROR, err);
      })
      .on('readable', () => {
        const data = input.read();
        if (data) {
          hasher.update(data);
          const currentProgress = Math.floor((input.bytesRead / fileSize) * 100);
          if (currentProgress > previousProgress) {
            ipcRenderer.emit(Event.HASH_FILE_PROGRESS, currentProgress, null);
          }
          previousProgress = currentProgress;
        } else {
          const hash = hasher.digest('hex');
          const comparison = comparisonString ? hash === comparisonString.toLowerCase() : null;
          const duration = ms(Date.now() - metricsStart);
          const digestResult: DigestResult = {
            algorithm,
            comparison,
            duration,
            filePath,
            fileSize,
            hash,
          };
          ipcRenderer.emit(Event.HASH_FILE_PROGRESS, 100, digestResult);
        }
      });
  } catch (err) {
    ipcRenderer.emit(Event.HASH_FILE_ERROR, err);
  }
}

export { getAlgorithmsInfo, hashFile };
