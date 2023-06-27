import { motion } from "framer-motion";
import { useState } from "react";

const AddVideo = ({ addVideo, btnEnable }) => {
  const [video, setVideo] = useState(null);

  const onChangeHandler = (event) => {
    setVideo(event.target.files[0]);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("video", video);
    addVideo(formData);
  };

  const imgCompo = () => {
    if (video) {
      return (
        <div className="flex relative">
          <video className="w-full">
            <source src={URL.createObjectURL(video)} type={video.type} />
          </video>
          <p
            className="absolute right-0 top-0 font-semibold cursor-pointer text-white"
            onClick={() => setVideo(null)}
          >
            ✕
          </p>
        </div>
      );
    } else {
      return (
        <label>
          <input type="file" className="hidden" onChange={onChangeHandler} />
          <motion.p
            whileTap={{ scale: 0.9 }}
            className="border-2 cursor-pointer p-5 text-lg rounded-md uppercase text-center hover:bg-gray-900"
          >
            Upload a video
          </motion.p>
        </label>
      );
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      {imgCompo()}
      {btnEnable ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-blue-600 text-white text-center py-1 rounded cursor-pointer mt-5 w-full"
        >
          Add Video
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-gray-600 cursor-not-allowed text-white text-center py-1 rounded mt-5 w-full"
          disabled={true}
        >
          Add Video
        </motion.button>
      )}
    </form>
  );
};

export default AddVideo;
