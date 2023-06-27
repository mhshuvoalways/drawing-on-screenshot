import { motion } from "framer-motion";
import { useState } from "react";

const AddVideo = ({ setNotes, toggleModalHandler, notes }) => {
  const [note, setNote] = useState(notes);

  const onChangeHandler = (event) => {
    setNote(event.target.value);
  };

  const onSubmitHandler = () => {
    setNotes(note);
    toggleModalHandler();
  };

  return (
    <div>
      <textarea
        className="w-full outline-0 text-black rounded p-1 h-32"
        onChange={onChangeHandler}
        value={note}
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white text-center py-1 rounded cursor-pointer mt-5 w-full"
        onClick={onSubmitHandler}
      >
        Add Note
      </motion.button>
    </div>
  );
};

export default AddVideo;
