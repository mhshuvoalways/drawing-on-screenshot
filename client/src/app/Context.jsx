import { createContext, useEffect, useState } from "react";
import axios from "../../utils/axios";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [proImageUrl, setProImageUrl] = useState([]);

  useEffect(() => {
    axios
      .get("/video/getvideos")
      .then((response) => {
        setProImageUrl(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MyContext.Provider value={{ proImageUrl, setProImageUrl }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
