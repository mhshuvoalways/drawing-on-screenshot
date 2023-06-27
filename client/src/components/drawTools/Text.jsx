import { useState, useRef, useEffect } from "react";

const Text = ({
  selectedTool,
  screenSize,
  selectedColor,
  selectedFontSize,
  clickAndSave,
}) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [textObjects, setTextObjects] = useState([]);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const startDragging = (event) => {
      event.preventDefault();
      setIsDragging(true);
      const position = getPosition(canvas, event);
      setStartPosition(position);
      setCurrentPosition(position);
    };

    const finishDragging = () => {
      setIsDragging(false);
      if (selectedText !== "") {
        setTextObjects((prevObjects) => [
          ...prevObjects,
          {
            text: selectedText,
            color: selectedColor,
            fontSize: selectedFontSize,
            position: currentPosition,
          },
        ]);
        setSelectedText("");
      }
    };

    const drag = (event) => {
      event.preventDefault();
      if (!isDragging) return;
      const newPosition = getPosition(canvas, event);
      setCurrentPosition(newPosition);
    };

    const redrawTextObjects = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      textObjects.forEach(({ text, color, fontSize, position }) => {
        context.fillStyle = color;
        context.font = `${fontSize}px Arial`;
        context.fillText(text, position.x, position.y);
      });
    };

    redrawTextObjects();

    canvas.addEventListener("mousedown", startDragging);
    canvas.addEventListener("mouseup", finishDragging);
    canvas.addEventListener("mousemove", drag);

    canvas.addEventListener("touchstart", startDragging, { passive: false });
    canvas.addEventListener("touchend", finishDragging, { passive: false });
    canvas.addEventListener("touchmove", drag, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", startDragging);
      canvas.removeEventListener("mouseup", finishDragging);
      canvas.removeEventListener("mousemove", drag);

      canvas.removeEventListener("touchstart", startDragging);
      canvas.removeEventListener("touchend", finishDragging);
      canvas.removeEventListener("touchmove", drag);
    };
  }, [
    isDragging,
    textObjects,
    startPosition,
    selectedColor,
    selectedFontSize,
    selectedText,
    currentPosition,
  ]);

  const getPosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    let x, y;

    if (event.type.startsWith("touch")) {
      const touch = event.touches[0] || event.changedTouches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    return { x, y };
  };

  const handleTextChange = (event) => {
    setSelectedText(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      finishDragging();
    }
  };

  const finishDragging = () => {
    setIsDragging(false);
    if (selectedText !== "") {
      setTextObjects((prevObjects) => [
        ...prevObjects,
        {
          text: selectedText,
          color: selectedColor,
          fontSize: selectedFontSize,
          position: startPosition,
        },
      ]);
      setSelectedText("");
    }
  };

  useEffect(() => {
    if (clickAndSave) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      setIsDragging(false);
      setTextObjects([]);
      setStartPosition({ x: 0, y: 0 });
      setCurrentPosition({ x: 0, y: 0 });
      setSelectedText("");
    }
  }, [clickAndSave]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={screenSize.width}
        height={screenSize.height}
        className={
          selectedTool === "text"
            ? "absolute inset-0 z-10"
            : "absolute inset-0 z-0"
        }
      />
      {selectedTool === "text" && (
        <div
          className="absolute z-20"
          style={{
            left: currentPosition.x,
            top: currentPosition.y,
          }}
        >
          <input
            type="text"
            value={selectedText}
            onChange={handleTextChange}
            onKeyUp={handleKeyUp}
            className="bg-transparent outline-0"
            style={{
              color: `${selectedColor}`,
            }}
            placeholder="Write..."
          />
        </div>
      )}
    </div>
  );
};

export default Text;
