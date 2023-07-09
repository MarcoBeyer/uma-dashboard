export const parseTitle = (
    decodedAncillaryData: string,
    titleIdentifier = "title:",
    descriptionIdentifier = "description:"
  ) => {
    const start = decodedAncillaryData.indexOf(titleIdentifier);
    const end =
      decodedAncillaryData.indexOf(descriptionIdentifier) ??
      decodedAncillaryData.length;

    if (start === -1) {
      return decodedAncillaryData;
    }

    const title = decodedAncillaryData
      .substring(start + titleIdentifier.length, end)
      .trim();
    // remove the trailing comma if it exists (from Polymarket)
    return title.endsWith(",") ? title.slice(0, -1) : title;
  };

export const parseDescription = (
    decodedAncillaryData: string,
    descriptionIdentifier = "description:"
  ) => {
    if (!decodedAncillaryData) {
      return undefined;
    }
    const start = decodedAncillaryData.indexOf(descriptionIdentifier);
    const end = decodedAncillaryData.length;

    if (start === -1) {
      return undefined;
    }

    return decodedAncillaryData.substring(
      start + descriptionIdentifier.length,
      end
    );
  };