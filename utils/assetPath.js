const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const assetPath = (path) => `${basePath}${path}`;