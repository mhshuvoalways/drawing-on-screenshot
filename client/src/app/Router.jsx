import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import VideosScreenshots from "../pages/VideosScreenshots";
import ScreenShots from "../pages/ScreenShots";
import Info from "../pages/Info";
import Videos from "../pages/Videos";
import Share from "../pages/Share";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/videosscreenshot" element={<VideosScreenshots />} />
        <Route path="/screenshots" element={<ScreenShots />} />
        <Route path="/info" element={<Info />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/share/:id" element={<Share />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
