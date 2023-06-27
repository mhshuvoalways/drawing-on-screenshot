import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Items = ({ screenshot, index, deleteHandler }) => {
  return (
    <div className="bg-gray-200 rounded">
      <div className="flex items-center gap-2 justify-between border px-5 py-2 bg-gray-100 rounded text-black">
        <p>#{index + 1}</p>
        <div className="flex gap-5 text-xl">
          <CopyToClipboard
            text={`http://localhost:5173/share/${screenshot._id}`}
          >
            <motion.i
              whileTap={{ scale: 0.9 }}
              className="fa-solid fa-share-nodes cursor-pointer text-green-600"
            ></motion.i>
          </CopyToClipboard>
          <motion.i
            onClick={() => deleteHandler(screenshot._id)}
            whileTap={{ scale: 0.9 }}
            className="fa-regular fa-trash-can cursor-pointer text-red-600"
          ></motion.i>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-between">
        {screenshot.pictures.map((pic) => (
          <img src={pic.path} className="w-5/12" key={pic._id} />
        ))}
      </div>
      <p className="px-5 py-3 text-gray-700">{screenshot.note}</p>
      <audio src={screenshot.audio} controls className="w-full h-8" />
    </div>
  );
};

export default Items;
