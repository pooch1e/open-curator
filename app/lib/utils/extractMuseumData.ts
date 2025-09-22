// Utility function to extract specific museum data fields

export const extractMuseumData = (data) => {

  const items = Array.isArray(data) ? data : data.data || [data];

  return items.map((item : any) => {
    // Extract basic info
    const extractedItem = {
      id: item.id || null,
      type: item.type || null,
      title: item.title || null,
      additionalType: item.additionalType || [],

      // Extract collection info
      collection: item.collection
        ? {
            id: item.collection.id || null,
            type: item.collection.type || null,
            title: item.collection.title || null,
          }
        : null,

      // Extract identifier
      identifier: item.identifier || null,

      // Extract medium/materials
      medium: item.medium
        ? item.medium.map((med) => ({
            type: med.type || null,
            title: med.title || null,
          }))
        : [],

      // Extract physical description
      physicalDescription: item.physicalDescription || null,

      // Extract image data - prioritize thumbnail, fallback to preview, then large
      image: null,
    };

    // Process images if they exist
    if (item.hasVersion && Array.isArray(item.hasVersion)) {
      for (const version of item.hasVersion) {
        if (version.type === 'StillImage' && version.hasVersion) {
          // Look for thumbnail first, then preview, then large image
          const thumbnail = version.hasVersion.find(
            (v) => v.version === 'thumbnail image'
          );
          const preview = version.hasVersion.find(
            (v) => v.version === 'preview image'
          );
          const large = version.hasVersion.find(
            (v) => v.version === 'large image'
          );

          const selectedImage = thumbnail || preview || large;

          if (selectedImage) {
            extractedItem.image = {
              url: selectedImage.identifier || null,
              version: selectedImage.version || null,
              rights: version.rights || null,
              rightsTitle: version.rightsTitle || null,
            };
            break; // Use first available image
          }
        }
      }
    }

    return extractedItem;
  });
};




