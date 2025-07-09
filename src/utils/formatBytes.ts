export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  let kB = bytes / 1024;
  if (kB < 1024) return `${Math.round(kB)} KB`;
  let MB = kB / 1024;
  if (MB < 1024) return `${Math.round(MB)} MB`;
  let GB = MB / 1024;
  return `${Math.round(GB)} GB`;
};
