export declare global {
  interface Window {
    api: {
      crypto: {
        getAlgorithms: () => {
          algorithms: string[];
          defaultAlgorithm: string;
        };
        hashFile: (filePath: string, algorithm: string, comparisonString: string) => void;
        onError: (callback: (error: Error) => void) => void;
        onProgress: (callback: (progress: number, digest?: DigestResult) => void) => void;
        removeAllListeners: () => void;
      };
      fs: {
        isValidFile: (filePath: string) => Promise<boolean>;
      };
      shell: {
        openInBrowser: (url: string) => Promise<void>;
      };
    };
  }
}
