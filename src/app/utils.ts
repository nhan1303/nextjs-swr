export const toQueryParams = (params: Record<string, string>): string => {
  return "?" + new URLSearchParams(params).toString();
};
