import { motion } from "framer-motion";
import { useState } from "react";

const DrawTool = ({
  selectedColor,
  handleColorChange,
  handleToolChange,
  selectedThickness,
  handleThicknessChange,
}) => {
  const [rangeToggle, setRangeToggle] = useState(false);

  const rangeToggleHandler = () => {
    setRangeToggle(!rangeToggle);
  };

  return (
    <div>
      <input
        type="range"
        className={rangeToggle ? "cursor-pointer w-full" : "opacity-0"}
        id="thicknessSlider"
        min="1"
        max="5"
        value={selectedThickness}
        onChange={handleThicknessChange}
      />
      <div className="flex gap-2 justify-between flex-wrap items-center py-1 px-2 rounded bg-white">
        <motion.i
          whileTap={{ scale: 0.9 }}
          className="fa-solid fa-pencil text-black text-xl cursor-pointer"
          onClick={() => handleToolChange("curved")}
        ></motion.i>
        <motion.i
          whileTap={{ scale: 0.9 }}
          className="fa-solid fa-arrow-pointer text-black text-xl cursor-pointer"
          onClick={() => handleToolChange("arrow")}
        ></motion.i>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="border-4 w-6 cursor-pointer border-black"
          onClick={() => handleToolChange("line")}
        ></motion.p>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="border-2 w-5 h-5 cursor-pointer border-black"
          onClick={() => handleToolChange("rectangle")}
        ></motion.p>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="border border-black w-6 h-6 rounded-full text-black flex justify-center items-center cursor-pointer text-xl font-semibold"
          onClick={() => handleToolChange("text")}
        >
          T
        </motion.p>
        <motion.input
          whileTap={{ scale: 0.9 }}
          type="color"
          className="cursor-pointer w-7"
          value={selectedColor}
          onChange={handleColorChange}
        />
        <motion.p
          onClick={rangeToggleHandler}
          whileTap={{ scale: 0.9 }}
          className="border-4 w-5 cursor-pointer border-blue-600"
        ></motion.p>
      </div>
    </div>
  );
};

export default DrawTool;
