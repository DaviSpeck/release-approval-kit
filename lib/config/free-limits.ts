export const FREE_LIMITS = {
  markdown: {
    maxChars: 120_000
  },
  attachments: {
    maxFiles: 8,
    maxFileBytes: 4 * 1024 * 1024,
    maxTotalBytes: 16 * 1024 * 1024,
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"] as const
  },
  request: {
    maxBodyBytes: 22 * 1024 * 1024
  },
  fileName: {
    maxChars: 120
  }
} as const;

export function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"] as const;
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}
