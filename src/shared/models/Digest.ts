type DigestProps = {
  algorithm: string;
  duration: string;
  equality: boolean | null;
  filePath: string;
  fileSize: number;
  hash: string;
};

interface Digest extends DigestProps {}

class Digest {
  constructor({ algorithm, duration, equality, filePath, fileSize, hash }: DigestProps) {
    this.algorithm = algorithm;
    this.duration = duration;
    this.equality = equality;
    this.filePath = filePath;
    this.fileSize = fileSize;
    this.hash = hash;
  }
}

export default Digest;
