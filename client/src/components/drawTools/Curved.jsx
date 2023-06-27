import { useRef, useEffect, useState } from "react";

const Curved = ({
  selectedTool,
  screenSize,
  selectedColor,
  selectedThickness,
  clickAndSave,
}) => {
  const canvasRefCurved = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initializeCanvas = () => {
    const canvas = canvasRefCurved.current;
    const context = canvas.getContext("2d");
    context.lineWidth = selectedThickness;
    context.strokeStyle = selectedColor;
    context.lineCap = "round";
  };

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas, selectedColor, selectedThickness]);

  useEffect(() => {
    if (clickAndSave) {
      const canvas = canvasRefCurved.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [clickAndSave]);

  const startDrawing = (event) => {
    const canvas = canvasRefCurved.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = getCoordinates(event);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const canvas = canvasRefCurved.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = getCoordinates(event);
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getCoordinates = (event) => {
    if (event.touches) {
      const { clientX, clientY } = event.touches[0];
      const canvas = canvasRefCurved.current;
      const rect = canvas.getBoundingClientRect();
      return {
        offsetX: clientX - rect.left,
        offsetY: clientY - rect.top,
      };
    } else {
      return {
        offsetX: event.nativeEvent.offsetX,
        offsetY: event.nativeEvent.offsetY,
      };
    }
  };

  return (
    <canvas
      ref={canvasRefCurved}
      width={screenSize.width}
      height={screenSize.height}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className={
        selectedTool === "curved"
          ? "absolute inset-0 z-10"
          : "absolute inset-0 z-0"
      }
    />
  );
};

export default Curved;
