import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DrawingTool from "./DrawTool";
import ScreenShots from "./ScreenShots";
import Recorder from "./Recorder";
import domtoimage from "dom-to-image";
import axios from "../../../../utils/axios";
import Modal from "../../Modal";
import AddNote from "./AddNote";

const Index = ({
  screenshotUrl,
  removeSreenShot,
  editScreen,
  setScreenshotUrl,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedTool, setSelectedTool] = useState("curved");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedThickness, setSelectedThickness] = useState(3);
  const [audioBlob, setAudioBlob] = useState(null);
  const [clickAndSave, setClickAndSave] = useState(false);
  const [modal, setModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [btnEnable, setEnable] = useState(true);

  const navigate = useNavigate();

  const modalHandler = () => {
    setModal(!modal);
  };

  const handleToolChange = (value) => {
    setSelectedTool(value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleThicknessChange = (event) => {
    setSelectedThickness(Number(event.target.value));
  };

  const handleTakeSave = (value) => {
    const element = document.getElementById("draw-capture");
    if (value === "save") {
      setEnable(false);
      domtoimage
        .toPng(element)
        .then(async function (dataUrl) {
          setClickAndSave(true);
          const byteString = atob(dataUrl.split(",")[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: "image/png" });
          const file = new File([blob], "draw.png", {
            lastModified: new Date().getTime(),
            type: "image/png",
          });
          const temp = [...screenshotUrl];
          const newObj = {
            id: currentImage + 1,
            screenshot: file,
            edited: true,
            screenSize: temp[currentImage].screenSize,
          };
          temp[currentImage] = newObj;
          setScreenshotUrl(temp);
          saveScreenShotHandler(temp);
        })
        .catch(function (error) {
          console.error("Oops, something went wrong!", error);
        });
    } else if (value === "increase") {
      domtoimage
        .toPng(element)
        .then(async function (dataUrl) {
          setClickAndSave(true);
          const byteString = atob(dataUrl.split(",")[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: "image/png" });
          const file = new File([blob], "draw.png", {
            lastModified: new Date().getTime(),
            type: "image/png",
          });
          const temp = [...screenshotUrl];
          const newObj = {
            id: currentImage + 1,
            screenshot: file,
            edited: true,
            screenSize: temp[currentImage].screenSize,
          };
          temp[currentImage] = newObj;
          setScreenshotUrl(temp);
          setCurrentImage((prev) => {
            if (screenshotUrl.length - 1 > prev) {
              return prev + 1;
            }
            return prev;
          });
        })
        .catch(function (error) {
          console.error("Oops, something went wrong!", error);
        });
    } else if (value === "decrease") {
      domtoimage
        .toPng(element)
        .then(async function (dataUrl) {
          setClickAndSave(true);
          const byteString = atob(dataUrl.split(",")[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: "image/png" });
          const file = new File([blob], "draw.png", {
            lastModified: new Date().getTime(),
            type: "image/png",
          });
          const temp = [...screenshotUrl];
          const newObj = {
            id: currentImage + 1,
            screenshot: file,
            edited: true,
            screenSize: temp[currentImage].screenSize,
          };
          temp[currentImage] = newObj;
          setScreenshotUrl(temp);
          setCurrentImage((prev) => {
            if (prev === 0) {
              return prev;
            }
            return prev - 1;
          });
        })
        .catch(function (error) {
          console.error("Oops, something went wrong!", error);
        });
    }
    setClickAndSave(false);
  };

  const saveScreenShotHandler = (gotUrls) => {
    const formData = new FormData();
    gotUrls.map((ss) => formData.append("files", ss.screenshot));
    formData.append("files", audioBlob);
    formData.append("note", notes);
    axios
      .post("/screenshot/postscreenshot", formData)
      .then(() => {
        navigate("/screenshots");
        setEnable(true);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
        setEnable(true);
      });
  };

  function isLastObjectWithId(id, array) {
    const foundObject = array.find((obj) => obj.id === id);
    return foundObject && array.indexOf(foundObject) === array.length - 1;
  }

  const deleteLastScreenshot = (id) => {
    setClickAndSave(true);
    const result = isLastObjectWithId(id, screenshotUrl);
    if (result) {
      removeSreenShot(id);
      setCurrentImage((prev) => {
        return prev - 1;
      });
    } else {
      removeSreenShot(id);
    }
    setClickAndSave(false);
  };

  return (
    <div>
      {modal && (
        <Modal toggleModalHandler={modalHandler}>
          <AddNote
            setNotes={setNotes}
            toggleModalHandler={modalHandler}
            notes={notes}
          />
        </Modal>
      )}
      <ScreenShots
        screenshotUrl={screenshotUrl}
        editScreen={editScreen}
        selectedTool={selectedTool}
        selectedColor={selectedColor}
        selectedThickness={selectedThickness}
        currentImage={currentImage}
        clickAndSave={clickAndSave}
        deleteLastScreenshot={deleteLastScreenshot}
      />
      <div className="flex justify-around gap-2 mt-3 items-center">
        <motion.i
          whileTap={{ scale: 0.9 }}
          className="fa-solid fa-pencil text-red-600 text-xl cursor-pointer"
          onClick={modalHandler}
        ></motion.i>
        <div className="flex justify-between gap-5 items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-green-600 rounded-md px-2 cursor-pointer"
            onClick={() => handleTakeSave("decrease")}
          >
            &lt;
          </motion.button>
          <p className="font-semibold">
            {currentImage + 1} out of {screenshotUrl.length}
          </p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-green-600 rounded-md px-2 cursor-pointer"
            onClick={() => handleTakeSave("increase")}
          >
            &gt;
          </motion.button>
        </div>
      </div>
      <div className="flex items-center gap-1 justify-between">
        <Recorder setAudioBlob={setAudioBlob} />
        <DrawingTool
          selectedColor={selectedColor}
          handleColorChange={handleColorChange}
          handleToolChange={handleToolChange}
          selectedThickness={selectedThickness}
          handleThicknessChange={handleThicknessChange}
        />
        {btnEnable ? (
          <motion.p
            whileTap={{ scale: 0.9 }}
            className="bg-green-600 text-sm w-12 h-12 flex justify-center items-center rounded-full cursor-pointer mt-5"
            onClick={() => handleTakeSave("save")}
          >
            Save
          </motion.p>
        ) : (
          <motion.p
            whileTap={{ scale: 0.9 }}
            className="bg-gray-600 text-sm w-12 h-12 flex justify-center items-center rounded-full cursor-not-allowed mt-5"
          >
            Save
          </motion.p>
        )}
      </div>
      {audioBlob && (
        <audio
          src={URL.createObjectURL(audioBlob)}
          controls
          className="w-full mt-2 h-8"
        />
      )}
    </div>
  );
};

export default Index;
