import { useEffect, useContext } from "react";
import VideosScreenshots from "../components/videosScreenshots";
import { MyContext } from "../app/Context";

const VideoPage = () => {
  const { takeS } = useContext(MyContext);

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
    <div>
      {takeS && <p className="fixed inset-0 bg-black opacity-70 z-50"></p>}
      <div className="px-5 py-2 w-full sm:w-96 mx-auto min-h-screen">
        <VideosScreenshots />
      </div>
    </div>
  );
};

export default VideoPage;
