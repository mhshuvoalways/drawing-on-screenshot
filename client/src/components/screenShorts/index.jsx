import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import Items from "./Items";

const Index = () => {
  const [screenshots, setScreenShots] = useState([]);

  const deleteHandler = (id) => {
    const temp = [...screenshots];
    axios
      .delete("/screenshot/deletescreenshot/" + id)
      .then(() => {
        const filteredArray = temp.filter((item) => item._id !== id);
        setScreenShots(filteredArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/screenshot/getscreenshot")
      .then((res) => {
        setScreenShots(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="space-y-3">
      <Link to="/">
        <i className="fa-solid fa-arrow-left cursor-pointer"></i>
      </Link>
      {[...screenshots].reverse().map((ss, index) => (
        <Items
          key={ss._id}
          screenshot={ss}
          index={index}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
};

export default Index;
