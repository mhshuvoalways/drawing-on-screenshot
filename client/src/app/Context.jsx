import { createContext, useEffect, useState } from "react";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [clickAndSave, setClickAndSave] = useState(false);

  const clickHandler = () => {
    setClickAndSave(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setClickAndSave(false);
    });
  }, []);

  return (
    <MyContext.Provider value={{ clickAndSave, clickHandler }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
