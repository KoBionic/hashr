declare type APIFile = File & {
  path: string;
};

declare type DigestResult = {
  algorithm: string;
  comparison: boolean | null;
  duration: string;
  filePath: string;
  fileSize: number;
  hash: string;
};
