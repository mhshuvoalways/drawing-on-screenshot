import { useState, useRef, useEffect } from "react";

const Rectangle = ({
  selectedTool,
  screenSize,
  selectedColor,
  selectedThickness,
  clickAndSave,
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [rectangles, setRectangles] = useState([]);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineWidth = selectedThickness;
    context.strokeStyle = selectedColor;

    const startDrawing = (event) => {
      event.preventDefault();
      setIsDrawing(true);
      const position = getPosition(canvas, event);
      setStartPosition(position);
    };

    const finishDrawing = () => {
      setIsDrawing(false);
      const currentPosition = getPosition(canvas, event);
      const rectangle = { start: startPosition, end: currentPosition };
      setRectangles([...rectangles, rectangle]);
    };

    const draw = (event) => {
      event.preventDefault();
      if (!isDrawing) return;
      const currentPosition = getPosition(canvas, event);
      redrawRectangles(context);
      drawRectangle(context, startPosition, currentPosition);
    };

    const redrawRectangles = (ctx) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rectangles.forEach((rectangle) => {
        drawRectangle(ctx, rectangle.start, rectangle.end);
      });
    };

    const drawRectangle = (ctx, start, end) => {
      ctx.beginPath();
      ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
      ctx.stroke();
    };

    redrawRectangles(context);

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
  }, [isDrawing, rectangles, startPosition, selectedColor, selectedThickness]);

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

  useEffect(() => {
    if (clickAndSave) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      setRectangles([]);
      setStartPosition({ x: 0, y: 0 });
    }
  }, [clickAndSave]);

  return (
    <canvas
      ref={canvasRef}
      width={screenSize.width}
      height={screenSize.height}
      className={
        selectedTool === "rectangle"
          ? "absolute inset-0 z-10"
          : "absolute inset-0 z-0"
      }
    />
  );
};

export default Rectangle;
