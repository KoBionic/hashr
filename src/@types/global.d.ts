type Digest = import('../shared/models/Digest').default;
type TargetFile = import('../shared/models/TargetFile').default;

interface File {
  path: string;
}

interface Window {
  api: {
    crypto: {
      getAlgorithms: () => { algorithms: string[]; defaultAlgorithm: string };
      hashFile: (filePath: string, algorithm: string, comparisonString: string) => void;
      onError: (callback: (error: Error) => void) => void;
      onProgress: (callback: (progress: number, digest?: Digest) => void) => void;
      removeAllListeners: () => void;
    };
    fs: {
      getFileInfo: (filePath: string) => Promise<TargetFile>;
      isValidFile: (filePath: string) => Promise<boolean>;
      onOpenFile: (callback: (file: TargetFile) => void) => void;
      removeAllListeners: () => void;
    };
    shell: {
      openInBrowser: (url: string) => Promise<void>;
    };
  };
}
