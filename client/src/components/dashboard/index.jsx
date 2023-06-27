import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BaseBallIcon from "../../assets/icons/baseball.svg";
import TitleIcon from "../../assets/title.png";

const index = () => {
  return (
    <div className="text-center">
      <img src={TitleIcon} className="mx-auto w-7/12" />
      <div className="border-2 rounded-2xl mt-5 flex justify-around items-center bg-gray-800 opacity-80">
        <Link to="/videosscreenshot">
          <motion.button whileTap={{ scale: 0.9 }}>
            <img
              src={BaseBallIcon}
              alt="video"
              className="w-20 cursor-pointer"
            />
          </motion.button>
        </Link>
      </div>
      <div className="border-2 rounded-2xl mt-5 py-3 text-gray-400">
        <Link to="/screenshots">
          <motion.button
            className="flex justify-center gap-5 items-center cursor-pointer mx-auto"
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-solid fa-camera text-3xl"></i>
            <p className="font-semibold">Screen Shots</p>
          </motion.button>
        </Link>
      </div>
      <div className="border-2 rounded-2xl mt-5 py-3 text-gray-400">
        <Link to="/info">
          <motion.button
            className="flex justify-center gap-5 items-center cursor-pointer mx-auto"
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-solid fa-info border-2 border-gray-400 rounded-full w-7 h-7 flex justify-center items-center"></i>
            <p className="font-semibold underline">Information</p>
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default index;
