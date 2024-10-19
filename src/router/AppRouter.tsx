import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "../pages/Home";
import About from "../pages/About";
import Facility from "../pages/Facility";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Room from "../pages/Room";
import VerificationEmail from "../pages/VerificationEmail";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="facilities" element={<Facility />} />
                <Route path="rooms" element={<Room />} />
                <Route path="about" element={<About />} />
                <Route path="auth/verify-email" element={<VerificationEmail />} />
                <Route path="" element={<PrivateRouter />} >
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
};

export default AppRouter;
