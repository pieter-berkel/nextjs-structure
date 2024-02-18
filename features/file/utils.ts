export const kebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

export const generateFileData = (filename: string) => {
  const [name, ...rest] = filename.split(".").map(kebabCase);
  const extension = rest.pop()?.toLowerCase();
  const suffix = Array.from(crypto.getRandomValues(new Uint8Array(5)), (dec) =>
    dec.toString(16).padStart(2, "0")
  ).join("");
  const key = `${name}_${suffix}${extension ? `.${extension}` : ""}`;
  return { key, extension };
};

export const formatFileSize = (bytes: number) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  let i = 0;

  while (bytes >= 1024) {
    bytes /= 1024;
    i++;
  }

  return `${bytes.toFixed(2)} ${units[i]}`;
};
