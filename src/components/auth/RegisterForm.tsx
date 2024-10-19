import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "../../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FaExternalLinkAlt } from "react-icons/fa";
import useAuthCall from "../../hooks/useAuthCall";
import TermsModal from "./TermsModal";

type FieldNames = 'firstName' | 'lastName' | 'username' | 'email' | 'password' | 'confirmPassword' | 'terms';

type FieldConfig = {
    name: FieldNames;
    label: string;
    type: string;
};

const initialValues: RegisterSchema = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
}

const RegisterForm: React.FC = () => {
    const { register: registerUser } = useAuthCall()
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState<'password' | 'text'>('password');


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterSchema>({
        mode: 'all',
        resolver: zodResolver(registerSchema),
        defaultValues: initialValues
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await registerUser(data)
        } catch (error) {
            console.error("Registration failed:", error);
            throw error
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));
    };

    const fields: FieldConfig[] = [
        { name: "firstName", label: "First Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text" },
        { name: "username", label: "Username", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: passwordType },
        { name: "confirmPassword", label: "Confirm Password", type: confirmPasswordType },
    ];

    const handleTermsClick = () => {
        setIsModalOpen(true);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-16 py-5 rounded-lg shadow-md dark:bg-dark-background2"
        >
            <div className="text-2xl text-center font-bold">
                Sign Up
            </div>
            <p className="mt-2 mb-8 text-center">
                Let’s get you all set up so you can access your personal account.
            </p>
            <div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex flex-1 gap-4">
                        {fields.slice(0, 2).map((field) => (
                            <div className="flex-1" key={field.name}>
                                <label className="block text-sm font-medium mb-1 ml-1" htmlFor={field.name}>
                                    {field.label}
                                </label>
                                <input
                                    {...register(field.name)}
                                    type={field.type}
                                    placeholder={field.label}
                                    className={`border ${errors[field.name as FieldNames] ? 'border-red-500' : 'border-gray-300'} rounded-md w-full py-2 px-3`}
                                    id={field.name}
                                />
                                {errors[field.name as FieldNames] && (
                                    <p className="text-red-500 text-sm">{errors[field.name as FieldNames]?.message}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4 mt-4 gap-2">
                    {fields.slice(2, 4).map((field) => (
                        <div className="flex-1" key={field.name}>
                            <label className="block text-sm font-medium mb-1 ml-1" htmlFor={field.name}>
                                {field.label}
                            </label>
                            <input
                                {...register(field.name)}
                                type={field.type}
                                placeholder={field.label}
                                className={`border ${errors[field.name as FieldNames] ? 'border-red-500' : 'border-gray-300'} rounded-md w-full py-2 px-3`}
                                id={field.name}
                            />
                            {errors[field.name as FieldNames] && (
                                <p className="text-red-500 text-sm">{errors[field.name as FieldNames]?.message}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col mt-4">
                    {fields.slice(4).map((field) => (
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
                                        className="p-2 absolute right-0"
                                    >
                                        {passwordType === 'password' ? <MdVisibilityOff className="dark:text-light-textSecondary" /> : <MdVisibility className="dark:text-light-textSecondary" />}
                                    </button>
                                )}
                                {field.name === "confirmPassword" && (
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="p-2 absolute right-0"
                                    >
                                        {confirmPasswordType === "password" ? <MdVisibilityOff className="dark:text-light-textSecondary" /> : <MdVisibility className="dark:text-light-textSecondary" />}
                                    </button>
                                )}
                            </div>
                            {errors[field.name as FieldNames] && (
                                <p className="text-red-500 text-sm">{errors[field.name as FieldNames]?.message}</p>
                            )}
                        </div>
                    ))}
                </div>


                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        {...register("terms", { required: "You must accept the terms and privacy policy" })}
                        className="mr-2"
                    />
                    <label className="text-sm mr-3" >I agree to all the Terms and Privacy Policies </label><FaExternalLinkAlt onClick={handleTermsClick} className="text-sm cursor-pointer text-light-textSecondary dark:text-dark-text" />
                </div>
                {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}

                <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-red-500 text-white rounded-md px-4 py-2">
                        Close
                    </button>
                </TermsModal>

                <button
                    className={`${isSubmitting ? 'disabled bg-gray-400' : 'bg-light-button'} w-full py-3 my-4 rounded-md text-dark-text`}
                    disabled={isSubmitting}
                >

                    {isSubmitting ? "Loading..." : "Create account"}
                </button>
                <p className="text-center mb-6">Already have an account? <span className="text-red-500 cursor-pointer" onClick={() => navigate("/login")}>Login</span></p>
                <div className="flex items-center my-4">
                    <div className="border-b-2 flex-grow border-gray-300"></div>
                    <span className="mx-4 text-gray-400">Or Sign up with</span>
                    <div className="border-b-2 flex-grow border-gray-300"></div>
                </div>
                <div className="border border-light-button w-[15rem] h-12 flex items-center justify-center rounded-md m-auto my-6 cursor-pointer text-gray-500">
                    <FcGoogle className="text-2xl mr-3" /> Sign up with Google
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
