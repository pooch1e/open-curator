export const getImageByVersion = (
  item,
  preferredVersion = 'thumbnail image'
) => {
  if (!item.hasVersion || !Array.isArray(item.hasVersion)) {
    return null;
  }

  for (const version of item.hasVersion) {
    if (version.type === 'StillImage' && version.hasVersion) {
      const foundImage = version.hasVersion.find(
        (v) => v.version === preferredVersion
      );
      if (foundImage) {
        return {
          url: foundImage.identifier,
          version: foundImage.version,
          rights: version.rights,
          rightsTitle: version.rightsTitle,
        };
      }
    }
  }

  return null;
};
