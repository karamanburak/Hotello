import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "../pages/Home";
import About from "../pages/About";
import Facility from "../pages/Facility";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="facilities" element={<Facility />} />
                <Route path="" element={<PrivateRouter />} >
                    <Route path="profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
};

export default AppRouter;
