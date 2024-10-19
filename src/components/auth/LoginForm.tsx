import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import useAuthCall from "../../hooks/useAuthCall";

type FieldNames = 'email' | 'password'
type FieldConfig = {
    name: FieldNames;
    label: string;
    type: string;
};

const initialValues: LoginSchema = {
    email: "",
    password: "",
}

const LoginForm: React.FC = () => {
    const { login } = useAuthCall()
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchema>({
        mode: 'all',
        resolver: zodResolver(loginSchema),
        defaultValues: initialValues
    });

    const togglePasswordVisibility = () => {
        setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));
    };


    const fields: FieldConfig[] = [
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: passwordType },
    ];


    const handleLogin = async (data: LoginSchema) => {
        try {
            await login(data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };


    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className="px-16 py-5 rounded-lg shadow-md  dark:bg-dark-background2"
        >
            <div className="text-2xl text-center font-bold">
                Login
            </div>
            <p className="mt-2 mb-8 text-center">
                Login to access your Hotello account
            </p>
            <div>
                <div className="flex flex-col mt-4">
                    {fields.map((field) => (
                        <div className="flex-1 mb-4 relative" key={field.name}>
                            <label className="block text-sm font-medium mb-1 ml-1" htmlFor={field.name}>
                                {field.label}
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <input
                                    {...register(field.name)}
                                    type={field.type}
                                    placeholder={field.label}
                                    className={`border-none rounded-md w-full py-2 px-3 focus:ring-0 ${errors[field.name as FieldNames] ? 'border-red-500' : 'border-gray-300'}`}
                                    id={field.name}
                                />
                                {field.name === "password" && (
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="p-2 absolute right-0 "
                                    >
                                        {passwordType === 'password' ? <MdVisibilityOff className="dark:text-light-textSecondary" /> : <MdVisibility className="dark:text-light-textSecondary" />}
                                    </button>
                                )}
                            </div>
                            {errors[field.name as FieldNames] && (
                                <p className="text-red-500 text-sm">{errors[field.name as FieldNames]?.message}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-red-500 text-sm cursor-pointer text-end" onClick={() => navigate("/forgot-password")}>Forgot Password</div>
                <button
                    className={`${isSubmitting ? 'disabled bg-gray-400' : 'bg-light-button'} w-full py-3 my-4 rounded-md text-dark-text`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Loading..." : "Login"}
                </button>
                <p className="text-center mb-6">Don't have an account? <span className="text-red-500 cursor-pointer" onClick={() => navigate("/register")}>Sign up</span></p>
                <div className="flex items-center my-4">
                    <div className="border-b-2 flex-grow border-gray-300"></div>
                    <span className="mx-4 text-gray-400">Or login with</span>
                    <div className="border-b-2 flex-grow border-gray-300"></div>
                </div>
                <div className="border border-light-button w-[10rem] h-12 flex items-center justify-center rounded-md m-auto my-6 cursor-pointer text-gray-500">
                    <FcGoogle className="text-2xl mr-3" /> Google
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
