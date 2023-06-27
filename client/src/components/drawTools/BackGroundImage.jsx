import { useRef, useEffect } from "react";
import Bg from "../../assets/bg.svg";

const Curved = ({ screenSize, screenshotUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = screenshotUrl[0];
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [screenshotUrl]);

  return (
    <canvas
      ref={canvasRef}
      width={screenSize.width}
      height={screenSize.height}
      className="z-0 h-screen"
    />
  );
};

export default Curved;
