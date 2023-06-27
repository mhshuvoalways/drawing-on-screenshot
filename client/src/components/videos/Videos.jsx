import { motion } from "framer-motion";

const Videos = ({ video, deleteVideo, btnEnable }) => {
  return (
    <div className="flex items-center gap-2 justify-between border bg-gray-200 rounded text-black border-gray-300">
      <video src={video.video} className="w-28" />
      <div className="flex gap-5 text-xl">
        {btnEnable ? (
          <motion.i
            whileTap={{ scale: 0.9 }}
            className="fa-regular fa-trash-can cursor-pointer text-red-600 mr-5"
            onClick={() => deleteVideo(video._id)}
          ></motion.i>
        ) : (
          <motion.i
            whileTap={{ scale: 0.9 }}
            className="fa-regular fa-trash-can cursor-not-allowed text-gray-600 mr-5"
          ></motion.i>
        )}
      </div>
    </div>
  );
};

export default Videos;
