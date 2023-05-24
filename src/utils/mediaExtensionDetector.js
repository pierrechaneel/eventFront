// utility function definition

const mediaExtensionDetector = ({ fileName }) => {
  if (
    [
      "mp4",
      "mov",
      "wmv",
      "avi",
      "avchd",
      "flv",
      "f4v",
      "swf",
      "mkf",
      "webm",
    ]?.some((ext) => fileName?.includes(ext))
  ) {
    return {
      type: "video",
    };
  } else if (
    ["tiff", "jpeg", "gif", "png", "jpg", "svg"]?.some((ext) =>
      fileName?.includes(ext)
    )
  ) {
    return {
      type: "picture",
    };
  } else {
    return {
      type: "unknown",
    };
  }
};

export default mediaExtensionDetector;
