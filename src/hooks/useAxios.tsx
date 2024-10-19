import axios from "axios";

export const axiosWithPublic = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};


const useAxios = () => {
    const token = getCookie("sessionId");

    const axiosWithToken = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: { "Authorization": `Bearer ${token}` },
        withCredentials: true,
    });

    return axiosWithToken
};
export default useAxios;