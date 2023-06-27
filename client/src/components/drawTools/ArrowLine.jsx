import { useState, useRef, useEffect } from "react";

const ArrowLine = ({
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
  const [currentLine, setCurrentLine] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const startDrawing = (event) => {
      event.preventDefault();
      setIsDrawing(true);
      const position = getPosition(canvas, event);
      setStartPosition(position);
      setCurrentLine({
        color: selectedColor,
        thickness: selectedThickness,
        line: { start: position, end: position },
      });
    };

    const finishDrawing = () => {
      setIsDrawing(false);
      if (currentLine) {
        setLines((prevLines) => [...prevLines, currentLine]);
        setCurrentLine(null);
      }
    };

    const draw = (event) => {
      event.preventDefault();
      if (!isDrawing) return;
      const currentPosition = getPosition(canvas, event);
      setCurrentLine((prevLine) => {
        if (!prevLine) return null;
        return {
          ...prevLine,
          line: { start: startPosition, end: currentPosition },
        };
      });
    };

    const redrawLines = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(({ color, thickness, line }) => {
        context.strokeStyle = color;
        context.lineWidth = thickness;
        drawLineWithArrowhead(context, line.start, line.end);
      });
      if (currentLine) {
        const { color, thickness, line } = currentLine;
        context.strokeStyle = color;
        context.lineWidth = thickness;
        drawLineWithArrowhead(context, line.start, line.end);
      }
    };

    const drawLineWithArrowhead = (ctx, start, end) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      const arrowAngle = Math.atan2(end.y - start.y, end.x - start.x);
      const arrowSize = selectedThickness * 10;
      const arrowPoint1 = {
        x: end.x - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
        y: end.y - arrowSize * Math.sin(arrowAngle - Math.PI / 6),
      };
      const arrowPoint2 = {
        x: end.x - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
        y: end.y - arrowSize * Math.sin(arrowAngle + Math.PI / 6),
      };

      ctx.fillStyle = selectedColor;
      ctx.beginPath();
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(arrowPoint1.x, arrowPoint1.y);
      ctx.lineTo(arrowPoint2.x, arrowPoint2.y);
      ctx.closePath();
      ctx.fill();
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
  }, [
    isDrawing,
    lines,
    startPosition,
    currentLine,
    selectedColor,
    selectedThickness,
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

  useEffect(() => {
    if (clickAndSave) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      setLines([]);
      setStartPosition({ x: 0, y: 0 });
    }
  }, [clickAndSave]);

  return (
    <canvas
      ref={canvasRef}
      width={screenSize.width}
      height={screenSize.height}
      className={
        selectedTool === "arrow"
          ? "absolute inset-0 z-10"
          : "absolute inset-0 z-0"
      }
    />
  );
};

export default ArrowLine;
