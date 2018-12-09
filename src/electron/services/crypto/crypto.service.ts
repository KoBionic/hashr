import bytes from 'bytes';
import crypto from 'crypto';
import fs from 'fs';
import moment from 'moment';
import ms from 'ms';
import path from 'path';
import { promisify } from 'util';
import { Events, HashingTypes } from '../../../models';
import { EventService } from '../../../services';
const stat = promisify(fs.stat);

class CryptoService {

    private static _instance: CryptoService;

    private constructor() {
    }

    static get Instance(): CryptoService {
        return CryptoService._instance || (CryptoService._instance = new CryptoService());
    }

    /**
     * Generates a message digest for the specified file. The resulting HashResult object contains several
     * information such as used algorithm, process duration and the message digest.
     *
     * @param filepath the path of the file to digest
     * @param algorithm the hashing algorithm to use
     * @param comparison the hash to compare to
     * @returns object resulting from the message digest
     */
    async hashFile(filepath: string, algorithm?: string, comparison?: string): Promise<HashingTypes.Result> {
        return new Promise<HashingTypes.Result>(async (resolve, reject) => {
            try {
                const size = (await stat(filepath)).size;

                const metricsStart = moment();

                // Set hashing algorithm if in enum, else use default one
                // @ts-ignore
                const alg = Object.keys(HashingTypes.Algorithm).includes(algorithm) ? algorithm : HashingTypes.Algorithm.SHA256;
                // Create hashing engine from the algorithm, forced to lowercase for better recognition
                const hasher = crypto.createHash(alg.toLowerCase());

                // Process read stream and resolve promise when end of stream is reached
                const input = fs.createReadStream(filepath);

                // Store previous progress value to prevent emitting an updateProgress event on every stream input
                let previousProgress = 0;

                input.on('readable', () => {
                    const data = input.read();

                    if (data) {
                        hasher.update(data);
                        const currentProgress = Math.floor(input.bytesRead / size * 100);
                        if (currentProgress > previousProgress) EventService.emit(Events.UPDATE_PROGRESS, currentProgress);
                        previousProgress = currentProgress;

                    } else {
                        const hash = hasher.digest('hex');

                        resolve({
                            algorithm: alg,
                            comparison: comparison ? hash === comparison.toLowerCase() : undefined,
                            duration: ms(moment().diff(metricsStart)),
                            filepath: path.resolve(filepath),
                            hash: hash,
                            filesize: bytes(size),
                        });
                    }
                });

                // Catch error here and reject promise
                input.on('error', err => {
                    input.close();
                    reject(err);
                });

            } catch (err) {
                reject(err);
            }
        });
    }

}

export default CryptoService;
