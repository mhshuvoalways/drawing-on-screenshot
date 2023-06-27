import { useEffect } from "react";
import VideosScreenshots from "../components/videosScreenshots";

const VideoPage = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="px-5 py-2 w-full sm:w-96 mx-auto min-h-screen">
      <VideosScreenshots />
    </div>
  );
};

export default VideoPage;
