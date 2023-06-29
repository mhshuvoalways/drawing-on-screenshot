import { createContext, useEffect, useState } from "react";
import axios from "../../utils/axios";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [proImageUrl, setProImageUrl] = useState([]);
  const [takeS, setTakeS] = useState(false);

  useEffect(() => {
    axios
      .get("/video/getvideos")
      .then((response) => {
        setProImageUrl(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MyContext.Provider
      value={{ proImageUrl, setProImageUrl, takeS, setTakeS }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
