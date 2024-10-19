import { useDispatch } from "react-redux";
import { fetchFail, forgotPasswordSuccess, loginSuccess, logoutSuccess, registerSuccess, resetPasswordSuccess, startLoading } from "../features/authSlice";
import axios from "axios";
import { handleError, handleSuccess } from "../helpers/swal";
import { useNavigate } from "react-router-dom";
import useAxios, { axiosWithPublic } from "./useAxios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosWithToken = useAxios()


    // Register User
    const register = async (userInfo: object) => {
        dispatch(startLoading());
        try {
            const { data } = await axiosWithPublic.post(`${BASE_URL}/users/`, userInfo);
            console.log(data);
            dispatch(registerSuccess(data.data));
            handleSuccess("Register was successful! You are being redirected to the homepage.");
            navigate("/auth/verify-email");
        } catch (error) {
            dispatch(fetchFail());
            if (axios.isAxiosError(error)) {
                handleError(error.response?.data.message || "An unexpected error occurred.");
            } else {
                handleError("An unexpected error occurred.");
            }
            console.log(error);
        }
    };

    // Login Users
    const login = async (userInfo: object) => {
        dispatch(startLoading());
        try {
            const { data } = await axiosWithPublic.post(`${BASE_URL}/auth/login`, userInfo);
            console.log('Login response:', data);
            dispatch(loginSuccess(data));
            handleSuccess(`Hello ${data.user.username}! Welcome back!`);
            navigate("/");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data.message || "An unexpected error occurred";
                handleError(errorMessage);
                console.log(error);
            } else {
                handleError("An unexpected error occurred.");
                console.log(error);
            }
        }
    };

    // Refresh Access Token
    const refreshAccessToken = async () => {
        try {
            const { data } = await axiosWithToken.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true });
            return data.bearer.access;
        } catch (error) {
            handleError("Refresh token expired. Please log in again.");
            console.log(error);
            logout();
        }
    };

    // Forgot Password
    const forgotPassword = async (email: string) => {
        dispatch(startLoading());
        try {
            const { data } = await axiosWithPublic.post(`${BASE_URL}/auth/forgot-password`, { email });
            console.log(data);
            dispatch(forgotPasswordSuccess(data));
            handleSuccess("A password reset link has been sent to your email.");
        } catch (error) {
            dispatch(fetchFail());
            handleError("Forgot Password request failed. Please try again.");
            console.log(error);
        }
    };

    // Reset Password
    const resetPassword = async (accessToken: string, newPassword: string) => {
        dispatch(startLoading());
        try {
            const { data } = await axiosWithToken.post(`${BASE_URL}/auth/reset-password`, { accessToken, newPassword });
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
    const logout = async () => {
        dispatch(startLoading());
        try {
            await axiosWithToken.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
            dispatch(logoutSuccess());
            handleSuccess("You have been logged out successfully.");
            navigate("/login");
        } catch (error) {
            dispatch(fetchFail());
            handleError("Logout failed. Please try again.");
            console.log(error);
        }
    };

    return { register, login, refreshAccessToken, forgotPassword, resetPassword, logout };
};

export default useAuthCall;
