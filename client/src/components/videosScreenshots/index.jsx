import { useState, useEffect, useRef, useContext } from "react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import Videos from "./videos/Videos";
import VideoController from "./videos/VideoController";
import ScreenShots from "./screenshots";
import { Link } from "react-router-dom";
import { MyContext } from "../../app/Context";

const Index = () => {
  const [proPlayerVideo, setProPlayerVideo] = useState(null);
  const [youthPlayerVideo, setYouthPlayerVideo] = useState(null);
  const [youthImageUrl, setYouthImageUrl] = useState([]);
  const [screenshotUrl, setScreenshotUrl] = useState([]);
  const [currentProImg, setCurrentProImg] = useState(0);
  const [edit, setEDit] = useState(false);
  const [toggleTop, setToggleTop] = useState("top");

  const { proImageUrl, setProImageUrl } = useContext(MyContext);

  // video controller
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    rafRef.current = requestAnimationFrame(handleTimeUpdate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("ended", handleVideoEnd);
    }
    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("ended", handleVideoEnd);
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleTimeUpdate]);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      rafRef.current = requestAnimationFrame(handleTimeUpdate);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    const video = videoRef.current;
    video.currentTime += video.duration * 0.03;
  };

  const handleSkipBackward = () => {
    const video = videoRef.current;
    video.currentTime -= video.duration * 0.03;
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  // video controller

  // Video control for youth
  const [isPlayingYouth, setIsPlayingYouth] = useState(false);
  const [currentTimeYouth, setCurrentTimeYouth] = useState(0);
  const videoRefYouth = useRef(null);
  const rafRefYouth = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTimeUpdateYouth = () => {
    setCurrentTimeYouth(videoRefYouth.current.currentTime);
    rafRefYouth.current = requestAnimationFrame(handleTimeUpdateYouth);
  };

  useEffect(() => {
    const video = videoRefYouth.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdateYouth);
      video.addEventListener("ended", handleVideoEndYouth);
    }
    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdateYouth);
        video.removeEventListener("ended", handleVideoEndYouth);
      }
      cancelAnimationFrame(rafRefYouth.current);
    };
  }, [handleTimeUpdateYouth]);

  const handleVideoEndYouth = () => {
    if (videoRefYouth.current) {
      videoRefYouth.current.currentTime = 0;
      setCurrentTimeYouth(0);
      setIsPlayingYouth(false);
    }
  };

  const handlePlayPauseYouth = () => {
    if (isPlayingYouth) {
      videoRefYouth.current.pause();
    } else {
      videoRefYouth.current.play();
      rafRefYouth.current = requestAnimationFrame(handleTimeUpdateYouth);
    }
    setIsPlayingYouth(!isPlayingYouth);
  };

  const handleSkipForwardYouth = () => {
    const video = videoRefYouth.current;
    video.currentTime += video.duration * 0.03;
  };

  const handleSkipBackwardYouth = () => {
    const video = videoRefYouth.current;
    video.currentTime -= video.duration * 0.03;
  };

  const handleSeekYouth = (e) => {
    const time = e.target.value;
    if (videoRefYouth.current) {
      videoRefYouth.current.currentTime = time;
      setCurrentTimeYouth(time);
    }
  };
  // Video control for youth

  const handleScreenshot = () => {
    const element = document.getElementById("capture-element");
    html2canvas(element).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      const byteString = atob(dataUrl.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: "image/png" });
      const screenshots = new File([blob], "draw.png", {
        lastModified: new Date().getTime(),
        type: "image/png",
      });
      const temp = [...screenshotUrl];
      const newObj = {
        id: temp.length + 1,
        screenshot: screenshots,
        edited: false,
      };
      temp.push(newObj);
      setScreenshotUrl(temp);
    });
  };

  const removeSreenShot = (id) => {
    const temp = [...screenshotUrl];
    const newS = temp.filter((ss) => ss.id != id);
    setScreenshotUrl(newS);
    if (!newS.length) {
      editScreen();
    }
  };

  const editScreen = () => {
    setEDit(!edit);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsPlayingYouth(false);
    setCurrentTimeYouth(0);
  };

  const currentProImgHandler = (value) => {
    if (value === "increase") {
      setCurrentProImg((prev) => {
        if (proImageUrl.length - 1 > prev) {
          return prev + 1;
        }
        return prev;
      });
    } else {
      setCurrentProImg((prev) => {
        if (prev === 0) {
          return prev;
        }
        return prev - 1;
      });
    }
  };

  return (
    <div>
      {edit ? (
        <ScreenShots
          screenshotUrl={screenshotUrl}
          removeSreenShot={removeSreenShot}
          editScreen={editScreen}
          setScreenshotUrl={setScreenshotUrl}
        />
      ) : (
        <div className="text-center space-y-10">
          <div>
            <div className="flex items-center justify-between mb-5">
              <Link to="/">
                <i className="fa-solid fa-arrow-left cursor-pointer flex justify-start text-white"></i>
              </Link>
              <Link to="/videos">
                <motion.button
                  className="bg-orange-300 py-2 px-4 underline rounded-md text-black text-sm font-semibold"
                  whileTap={{ scale: 0.9 }}
                >
                  Get Videos
                </motion.button>
              </Link>
            </div>
            <Videos
              proPlayerVideo={proPlayerVideo}
              setProPlayerVideo={setProPlayerVideo}
              proImageUrl={proImageUrl}
              setProImageUrl={setProImageUrl}
              youthPlayerVideo={youthPlayerVideo}
              setYouthPlayerVideo={setYouthPlayerVideo}
              youthImageUrl={youthImageUrl}
              setYouthImageUrl={setYouthImageUrl}
              videoRef={videoRef}
              videoRefYouth={videoRefYouth}
              currentProImg={currentProImg}
            />
          </div>
          <VideoController
            handleScreenshot={handleScreenshot}
            editScreen={editScreen}
            proPlayerVideo={proPlayerVideo}
            youthPlayerVideo={youthPlayerVideo}
            toggleTop={toggleTop}
            setToggleTop={setToggleTop}
            handleSeek={handleSeek}
            currentTime={currentTime}
            videoRef={videoRef}
            handlePlayPause={handlePlayPause}
            isPlaying={isPlaying}
            handleSeekYouth={handleSeekYouth}
            currentTimeYouth={currentTimeYouth}
            videoRefYouth={videoRefYouth}
            handlePlayPauseYouth={handlePlayPauseYouth}
            isPlayingYouth={isPlayingYouth}
            currentProImgHandler={currentProImgHandler}
            proImageUrl={proImageUrl}
            handleSkipForward={handleSkipForward}
            handleSkipBackward={handleSkipBackward}
            handleSkipForwardYouth={handleSkipForwardYouth}
            handleSkipBackwardYouth={handleSkipBackwardYouth}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
