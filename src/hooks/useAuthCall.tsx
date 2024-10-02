import { useDispatch } from "react-redux";
import { fetchFail, forgotPasswordSuccess, loginSuccess, logoutSuccess, registerSuccess, resetPasswordSuccess, startLoading } from "../features/authSlice";
import axios from "axios";
import { handleError, handleSuccess } from "../helpers/swal";
import { useNavigate } from "react-router-dom";
import { axiosWithPublic } from "./useAxios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL

const useAuthCall = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();


    // Register User
    const register = async (userInfo: object) => {
        dispatch(startLoading())
        try {
            const { data } = await axiosWithPublic.post(`${BASE_URL}/users/`, userInfo)
            console.log(data);
            dispatch(registerSuccess(data.data))
            handleSuccess("Register was successful! You are being redirected to the homepage.")
            navigate("/")
        } catch (error) {
            dispatch(fetchFail())
            if (axios.isAxiosError(error)) {
                handleError(error.response?.data.message || "An unexpected error occurred.");
            } else {
                handleError("An unexpected error occurred.");
            } console.log(error);
        }
    };
    // Login Users
    const login = async (userInfo: object) => {
        dispatch(startLoading())
        try {
            console.log("Logging in with URL:", `${BASE_URL}/auth/login`, "and userInfo:", userInfo); // Add logging here
            const { data } = await axiosWithPublic.post(`${BASE_URL}/auth/login`, userInfo);
            console.log("Response data:", data);

            if (data?.bearer?.access) {
                const decodedToken = jwtDecode(data.bearer.access); // Decode the JWT token
                console.log(decodedToken); // Log the decoded token to inspect its claims
                localStorage.setItem("token", data.bearer.access);
                localStorage.setItem("refreshToken", data.bearer.refresh);
            }

            dispatch(loginSuccess(data))
            handleSuccess(`Hello ${data.user.username}! Welcome back! Explore our latest offers and enjoy an unforgettable stay with us!`)
            navigate("/");
        } catch (error) {
            handleError("Login could not be completed.Please check your credentials or contact our support team for assistance.")
            console.log(error);
        }
    };
    // Forgot Password
    const forgotPassword = async (email: string) => {
        dispatch(startLoading());
        try {
            const { data } = await axiosWithPublic.post(`${BASE_URL}/auth/forgot-password`, { email });
            console.log(data);
            dispatch(forgotPasswordSuccess(data))
            handleSuccess("A password reset link has been sent to your email.");
        } catch (error) {
            dispatch(fetchFail());
            handleError("Forgot Password request failed. Please try again.");
            console.log(error);
        }
    };
    // Reset Password
    const resetPassword = async (token: string, newPassword: string) => {
        dispatch(startLoading());
        try {
            const { data } = await axiosWithPublic.post(`${BASE_URL}/auth/reset-password`, { token, newPassword });
            console.log(data);
            dispatch(resetPasswordSuccess(data));
            handleSuccess("Password reset successful. You can now log in with your new password.");
            navigate("/login");
        } catch (error) {
            dispatch(fetchFail());
            handleError("Password reset failed. Please try again.");
            console.log(error);
        }
    };
    // Logout User
    const logout = () => {
        dispatch(startLoading());
        try {
            localStorage.removeItem("token"); // Remove JWT token
            dispatch(logoutSuccess());
            handleSuccess("You have been logged out successfully.");
            navigate("/");
        } catch (error) {
            dispatch(fetchFail());
            handleError("Logout failed. Please try again.");
            console.log(error);
        }
    };

    return { register, login, forgotPassword, resetPassword, logout }
};

export default useAuthCall;
