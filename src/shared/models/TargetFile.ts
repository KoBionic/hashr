import { stat } from 'fs/promises';
import mime from 'mime';
import path from 'path';

type TargetFileProps = {
  lastModified: number;
  name: string;
  path: string;
  size: number;
  type: string;
};

interface TargetFile extends TargetFileProps {}

class TargetFile {
  constructor({ lastModified, name, path, size, type }: TargetFileProps) {
    this.lastModified = lastModified;
    this.name = name;
    this.path = path;
    this.size = size;
    this.type = type;
  }

  static async from(filePath: string): Promise<TargetFile> {
    const stats = await stat(filePath);
    const name = path.basename(filePath);

    return new this({
      lastModified: stats.mtime.getTime(),
      name,
      path: filePath,
      size: stats.size,
      type: mime.getType(filePath) || '',
    });
  }
}

export default TargetFile;
