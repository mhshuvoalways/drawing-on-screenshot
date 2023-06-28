import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Videos from "./Videos";
import Modal from "../Modal";
import { useState, useContext } from "react";
import AddVideo from "./AddVideo";
import axios from "../../../utils/axios";
import { MyContext } from "../../app/Context";

const Index = () => {
  const [modal, setModal] = useState(false);
  const [btnEnable, setEnable] = useState(true);

  const { proImageUrl, setProImageUrl } = useContext(MyContext);

  const modalHandler = () => {
    setModal(!modal);
  };

  const addVideo = (video) => {
    setEnable(false);
    const temp = [...proImageUrl];
    axios
      .post("/video/postvideo", video)
      .then((res) => {
        temp.push(res.data);
        setProImageUrl(temp);
        modalHandler();
        setEnable(true);
      })
      .catch(() => {
        setEnable(true);
      });
  };

  const deleteVideo = (id) => {
    setEnable(false);
    const temp = [...proImageUrl];
    axios
      .delete("/video/deletevideo/" + id)
      .then(() => {
        const newVideos = temp.filter((v) => v._id !== id);
        setProImageUrl(newVideos);
        setEnable(true);
      })
      .catch(() => {
        setEnable(true);
      });
  };

  return (
    <div className="space-y-5">
      <Link to="/videosscreenshot">
        <i className="fa-solid fa-arrow-left cursor-pointer"></i>
      </Link>
      <motion.p
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white text-center py-1 rounded cursor-pointer"
        onClick={modalHandler}
      >
        Add Video
      </motion.p>
      <div className="space-y-1">
        {proImageUrl.map((video) => (
          <Videos
            key={video._id}
            video={video}
            deleteVideo={deleteVideo}
            btnEnable={btnEnable}
          />
        ))}
      </div>
      {modal && (
        <Modal toggleModalHandler={modalHandler}>
          <AddVideo addVideo={addVideo} btnEnable={btnEnable} />
        </Modal>
      )}
    </div>
  );
};

export default Index;
