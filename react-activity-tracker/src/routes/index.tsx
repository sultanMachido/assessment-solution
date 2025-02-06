import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActivityTracker from "../pages/live-user-activity";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ActivityTracker />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
