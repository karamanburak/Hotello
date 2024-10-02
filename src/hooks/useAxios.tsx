import axios from "axios";

export const axiosWithPublic = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxios = () => {
    const token = localStorage.getItem("token");

    const axiosWithToken = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: { "Authorization": `Bearer ${token}` }
    });
    return axiosWithToken
};
export default useAxios;