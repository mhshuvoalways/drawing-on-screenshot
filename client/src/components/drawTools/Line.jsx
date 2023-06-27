import { useState, useRef, useEffect } from "react";

const Line = ({
  selectedTool,
  screenSize,
  selectedColor,
  selectedThickness,
  clickAndSave,
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (clickAndSave) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      setLines([]);
      setStartPosition({ x: 0, y: 0 });
    }
  }, [clickAndSave]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const startDrawing = (event) => {
      event.preventDefault();
      setIsDrawing(true);
      const position = getPosition(canvas, event);
      setStartPosition(position);
      setLines((prevLines) => [
        ...prevLines,
        {
          color: selectedColor,
          thickness: selectedThickness,
          line: { start: position, end: position },
        },
      ]);
    };

    const finishDrawing = () => {
      setIsDrawing(false);
    };

    const draw = (event) => {
      event.preventDefault();
      if (!isDrawing) return;
      const currentPosition = getPosition(canvas, event);
      setLines((prevLines) => {
        const updatedLines = [...prevLines];
        const lastLine = updatedLines[updatedLines.length - 1];
        lastLine.line = { start: startPosition, end: currentPosition };
        return updatedLines;
      });
    };

    const redrawLines = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(({ color, thickness, line }) => {
        context.beginPath();
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.moveTo(line.start.x, line.start.y);
        context.lineTo(line.end.x, line.end.y);
        context.stroke();
      });
    };

    redrawLines();

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", finishDrawing);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchend", finishDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", finishDrawing);
      canvas.removeEventListener("mousemove", draw);

      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchend", finishDrawing);
      canvas.removeEventListener("touchmove", draw);
    };
  }, [isDrawing, lines, startPosition, selectedColor, selectedThickness]);

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

  return (
    <canvas
      ref={canvasRef}
      width={screenSize.width}
      height={screenSize.height}
      className={
        selectedTool === "line"
          ? "absolute inset-0 z-10"
          : "absolute inset-0 z-0"
      }
    />
  );
};

export default Line;
