import type { FileErrorCodeKey } from "./types";

export class FileError extends Error {
  public readonly cause?: Error;
  public readonly code: FileErrorCodeKey;

  constructor(opts: {
    message: string;
    code: FileErrorCodeKey;
    cause?: Error;
  }) {
    super("[file]: " + opts.message);
    this.name = "FileError";

    this.code = opts.code;
    this.cause = opts.cause;
  }
}
