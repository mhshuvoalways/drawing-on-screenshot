import React from "react";
import VideoInput from "./VideoInput";

const Videos = ({
  proPlayerVideo,
  setProPlayerVideo,
  proImageUrl,
  setProImageUrl,
  youthPlayerVideo,
  setYouthPlayerVideo,
  youthImageUrl,
  setYouthImageUrl,
  videoRef,
  videoRefYouth,
  currentProImg,
}) => {
  const proUploadHandler = (event) => {
    setProPlayerVideo(event.target.files[0]);
  };

  const youthUploadHandler = (event) => {
    setYouthPlayerVideo(event.target.files[0]);
  };

  return (
    <div id="capture-element">
      <VideoInput
        uploadHandler={proUploadHandler}
        playerVideo={proPlayerVideo}
        imageUrl={proImageUrl}
        setImageUrl={setProImageUrl}
        setPlayerVideo={setProPlayerVideo}
        inputPlaceHolder="pro player"
        videoRef={videoRef}
        currentProImg={currentProImg}
      />
      <VideoInput
        uploadHandler={youthUploadHandler}
        playerVideo={youthPlayerVideo}
        imageUrl={youthImageUrl}
        setImageUrl={setYouthImageUrl}
        setPlayerVideo={setYouthPlayerVideo}
        inputPlaceHolder="youth player"
        videoRef={videoRefYouth}
        currentProImg={currentProImg}
      />
    </div>
  );
};

export default React.memo(Videos);
