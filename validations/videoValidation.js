const video = (video) => {
  const error = {};
  if (!video) {
    error.video = "Please provide your video";
  }
  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = video;
