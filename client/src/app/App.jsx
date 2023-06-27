import Router from "./Router";
import { MyContextProvider } from "./Context";

const App = () => {
  return (
    <MyContextProvider>
      <div className="bg-gray-800 mix-h-screen text-white overflow-hidden">
        <Router />
      </div>
    </MyContextProvider>
  );
};

export default App;
