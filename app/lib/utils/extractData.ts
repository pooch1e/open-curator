export const extractData = (data: any) => {
  if (!data || data.length === 0) return [];

  return { id: data };
};
