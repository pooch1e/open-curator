// Helper function to filter only items with images
export const extractMuseumDataWithImages = (data) => {
  const extracted = extractMuseumData(data);
  return extracted.filter((item) => item.image !== null);
};