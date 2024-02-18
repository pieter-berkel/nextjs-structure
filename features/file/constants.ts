export const AWS_CREDENTIALS = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
} as const;

export const FILE_ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FILE_TOO_LARGE: 413,
  MEDIA_TYPE_NOT_ACCEPTED: 415,
} as const;
