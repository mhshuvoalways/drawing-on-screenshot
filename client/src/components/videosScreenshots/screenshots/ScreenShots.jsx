import { useState, useEffect } from "react";
import Line from "../../drawTools/Line";
import Curved from "../../drawTools/Curved";
import Rectangle from "../../drawTools/Ractangle";
import ArrowLine from "../../drawTools/ArrowLine";
import Text from "../../drawTools/Text";

const ScreenShots = ({
  editScreen,
  screenshotUrl,
  selectedTool,
  selectedColor,
  selectedThickness,
  currentImage,
  clickAndSave,
  deleteLastScreenshot,
}) => {
  const [screenSize, setImageSceenSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const img = new Image();
    img.src = URL.createObjectURL(screenshotUrl[currentImage]?.screenshot);

    img.onload = () => {
      const width = img.width / 2;
      const height = img.height / 2;
      setImageSceenSize({
        width,
        height,
      });
    };
  }, [currentImage, screenshotUrl]);

  return (
    <div>
      <i
        className="fa-solid fa-arrow-left cursor-pointer text-white"
        onClick={() => editScreen("clean")}
      ></i>
      <div className="relative">
        <div
          className="bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${
              screenshotUrl.length &&
              URL.createObjectURL(screenshotUrl[currentImage]?.screenshot)
            })`,
            height: `${screenSize.height}px`,
            width: `${screenSize.width}px`,
          }}
          id="draw-capture"
        >
          <Curved
            selectedTool={selectedTool}
            screenSize={screenSize}
            selectedColor={selectedColor}
            selectedThickness={selectedThickness}
            clickAndSave={clickAndSave}
          />
          <Line
            selectedTool={selectedTool}
            screenSize={screenSize}
            selectedColor={selectedColor}
            selectedThickness={selectedThickness}
            clickAndSave={clickAndSave}
          />
          <Rectangle
            selectedTool={selectedTool}
            screenSize={screenSize}
            selectedColor={selectedColor}
            selectedThickness={selectedThickness}
            clickAndSave={clickAndSave}
          />
          <ArrowLine
            selectedTool={selectedTool}
            screenSize={screenSize}
            selectedColor={selectedColor}
            selectedThickness={selectedThickness}
            clickAndSave={clickAndSave}
          />
          <Text
            selectedTool={selectedTool}
            screenSize={screenSize}
            selectedColor={selectedColor}
            selectedFontSize={20}
            clickAndSave={clickAndSave}
          />
        </div>
        <p
          className="text-xl font-semibold cursor-pointer h-5 w-5 absolute right-0 top-0 text-white z-50"
          onClick={() => {
            deleteLastScreenshot(screenshotUrl[currentImage].id);
          }}
        >
          ✕
        </p>
      </div>
    </div>
  );
};

export default ScreenShots;
