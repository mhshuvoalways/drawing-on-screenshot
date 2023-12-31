import { motion } from "framer-motion";

const VideoController = ({
  handleScreenshot,
  editScreen,
  proPlayerVideo,
  youthPlayerVideo,
  toggleTop,
  setToggleTop,
  // currentProImgHandler,

  handleSeek,
  currentTime,
  videoRef,
  handlePlayPause,
  isPlaying,
  handleSkipForward,
  handleSkipBackward,

  handleSeekYouth,
  currentTimeYouth,
  videoRefYouth,
  handlePlayPauseYouth,
  isPlayingYouth,
  proImageUrl,
  handleSkipForwardYouth,
  handleSkipBackwardYouth,
}) => {
  return (
    <div>
      <input
        type="range"
        className="w-full"
        value={currentTime}
        min="0"
        max={videoRef.current ? videoRef.current.duration : 0}
        onChange={handleSeek}
        step="0.01"
      />
      <input
        type="range"
        className="w-full mt-5"
        value={currentTimeYouth}
        min="0"
        max={videoRefYouth.current ? videoRefYouth.current.duration : 0}
        onChange={handleSeekYouth}
        step="0.01"
      />
      <div className="flex justify-between gap-2 items-center flex-wrap">
        <div className="flex items-center">
          <motion.i
            whileTap={{ scale: 0.9 }}
            className="fa-solid fa-backward-fast text-white w-10 h-10 flex justify-center items-center cursor-pointer rounded-full"
            onClick={() => {
              toggleTop === "top"
                ? handleSkipBackward()
                : handleSkipBackwardYouth();
            }}
          ></motion.i>
          <motion.i
            whileTap={{ scale: 0.9 }}
            className={`fa-solid fa-${
              toggleTop === "top"
                ? isPlaying
                  ? "pause"
                  : "play"
                : isPlayingYouth
                ? "pause"
                : "play"
            } text-white text-3xl w-14 h-14 flex justify-center items-center cursor-pointer rounded-full pl-1`}
            onClick={() => {
              toggleTop === "top" ? handlePlayPause() : handlePlayPauseYouth();
            }}
          ></motion.i>
          <motion.i
            whileTap={{ scale: 0.9 }}
            className="fa-solid fa-forward-fast text-white w-10 h-10 flex justify-center items-center cursor-pointer rounded-full"
            onClick={() => {
              toggleTop === "top"
                ? handleSkipForward()
                : handleSkipForwardYouth();
            }}
          ></motion.i>
        </div>
        <select
          className=" outline-0 rounded-md text-black px-1 py-1"
          onChange={(event) => {
            isPlaying && handlePlayPause();
            isPlayingYouth && handlePlayPauseYouth();
            setToggleTop(event.target.value);
          }}
        >
          <option value="top">top control</option>
          <option value="bottom">bottom control</option>
        </select>
      </div>
      <div>
        {(proPlayerVideo && youthPlayerVideo) ||
        (proImageUrl.length && youthPlayerVideo) ? (
          <div className="flex gap-2 items-center justify-center">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="bg-gray-600 rounded-lg px-5 cursor-pointer"
              onClick={() => handleScreenshot()}
            >
              <i className="fa-solid fa-camera text-3xl text-white w-10 h-10 flex justify-center items-center"></i>
            </motion.div>
            <motion.i
              whileTap={{ scale: 0.9 }}
              className="fa-solid fa-pencil text-black bg-white w-10 h-10 flex justify-center items-center cursor-pointer rounded-full"
              onClick={editScreen}
            ></motion.i>
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="bg-gray-600 rounded-lg px-5 cursor-not-allowed"
            >
              <i className="fa-solid fa-camera text-3xl text-white w-10 h-10 flex justify-center items-center"></i>
            </motion.div>
            <motion.i
              whileTap={{ scale: 0.9 }}
              className="fa-solid fa-pencil text-white bg-gray-600 w-10 h-10 flex justify-center items-center cursor-not-allowed rounded-full"
            ></motion.i>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoController;
