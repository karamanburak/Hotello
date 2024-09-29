import { useDispatch } from "react-redux";
import { fetchFail, loginSuccess, registerSuccess, startLoading } from "../features/authSlice";
import axios from "axios";
import { handleError, handleSuccess } from "../helpers/swal";
import { useNavigate } from "react-router-dom";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const useAuthCall = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const register = async (userInfo: IUser) => {
        dispatch(startLoading())
        try {
            const { data } = await axios.post(`${BACKEND_URL}/users`, userInfo)
            console.log(data);
            dispatch(registerSuccess(data.data))
            handleSuccess("Register was successfully")
            navigate("/")

        } catch (error) {
            dispatch(fetchFail())
            handleError("Register can not be performed")
            console.log(error);
        }
    };
    const login = async (userInfo: IUser) => {
        dispatch(startLoading())
        try {
            const { data } = await axios.post(`${BACKEND_URL}auth/login`, userInfo);
            // console.log(data);
            dispatch(loginSuccess(data))
            handleSuccess(`Hello ${data.user.username}! Welcome back! Explore our latest offers and enjoy an unforgettable stay with us!`)
        } catch (error) {
            handleError("Login could not be completed.Please check your credentials or contact our support team for assistance.")
            console.log(error);

        }

    };

    return { register, login }
};

export default useAuthCall;
