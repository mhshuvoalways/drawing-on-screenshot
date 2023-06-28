import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PlayerVideoView = ({
  imageUrl,
  setImageUrl,
  playerVideo,
  setPlayerVideo,
  uploadHandler,
  inputPlaceHolder,
  videoRef,
  currentProImg,
}) => {
  const [blob, setBlob] = useState(null);

  useEffect(() => {
    const createVideoBlobFromURL = (url) => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          setBlob(blob);
        })
        .catch((error) => {
          console.error("Error fetching video:", error);
        });
    };
    createVideoBlobFromURL(imageUrl[currentProImg]?.video);
  }, [currentProImg, imageUrl]);

  if (imageUrl.length) {
    return (
      <div className="flex relative">
        {blob && (
          <video
            className="w-full"
            ref={videoRef}
            src={URL.createObjectURL(blob)}
          />
        )}
        <p
          className="text-xl absolute -right-4 top-0 font-semibold cursor-pointer text-white"
          onClick={() => setImageUrl([])}
        >
          ✕
        </p>
      </div>
    );
  } else if (playerVideo) {
    return (
      <div className="flex relative">
        <video className="w-full" ref={videoRef}>
          <source
            src={URL.createObjectURL(playerVideo)}
            type={playerVideo.type}
          />
        </video>
        <p
          className="text-xl absolute -right-4 top-0 font-semibold cursor-pointer text-white"
          onClick={() => setPlayerVideo(null)}
        >
          ✕
        </p>
      </div>
    );
  } else {
    return (
      <label>
        <input
          type="file"
          className="hidden text-center"
          onChange={uploadHandler}
        />
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="border-2 cursor-pointer py-10 text-lg rounded-md uppercase mt-5 text-white"
        >
          {inputPlaceHolder}
        </motion.p>
      </label>
    );
  }
};
export default PlayerVideoView;
