import axios from "axios";
import { useSelector } from "react-redux"
import { RootState } from "../app/store"


const useAxios = () => {
    const { bearer } = useSelector((state: RootState) => state.auth)

    const axiosWithToken = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: { "Authorization": `Bearer ${bearer?.access}` }
    });
    return axiosWithToken
};
export default useAxios;