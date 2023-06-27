import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { useParams } from "react-router-dom";

const Index = () => {
  const [singleScreenshot, setScreenshot] = useState(null);

  const params = useParams();

  useEffect(() => {
    axios
      .get("/screenshot/getsinglescreenshot/" + params.id)
      .then((res) => {
        setScreenshot(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <div className="my-5">
      {singleScreenshot?.pictures.map((pic) => (
        <img src={pic.path} key={pic._id} className="w-full mb-3 rounded" />
      ))}
      <p className="mt-5">{singleScreenshot?.note}</p>
      <audio
        src={singleScreenshot?.audio}
        controls
        className="h-10 mt-5 w-full"
      />
    </div>
  );
};

export default Index;
