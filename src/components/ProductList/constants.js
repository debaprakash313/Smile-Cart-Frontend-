export const DEFAULT_PAGE_SIZE = 8;
export const DEFAULT_PAGE_INDEX = 1;
export const buildUrl = (base, params) => {
  const query = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");

  return `${base}?${query}`;
};
