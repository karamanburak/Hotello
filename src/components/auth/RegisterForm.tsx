import React from "react";
import { useForm } from "react-hook-form";
import { schema, type Schema } from "../../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

type FieldNames = 'firstName' | 'lastName' | 'username' | 'email' | 'password' | 'confirmPassword' | 'terms';

type FieldConfig = {
    name: FieldNames;
    label: string;
    type: string;
};

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        mode: 'all',
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: Schema) => {
        console.log(data);
    };

    const fields: FieldConfig[] = [
        { name: "firstName", label: "First Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text" },
        { name: "username", label: "Username", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
        { name: "confirmPassword", label: "Confirm Password", type: "password" },
    ];

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-16 py-2 rounded-lg shadow-md dark:shadow-2xl"
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
                        <div className="flex-1 mb-4" key={field.name}>
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

                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        {...register("terms", { required: "You must accept the terms and privacy policy" })}
                        className="mr-2"
                    />
                    <label className="text-sm ">I agree to all the Terms and Privacy Policies</label>
                </div>
                {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}

                <button className="bg-light-button w-full py-3 my-4 rounded-md text-dark-text">Create account</button>
                <p className="text-center mb-6">Already have an account? <span className="text-red-500 cursor-pointer" onClick={() => navigate("/login")}>Login</span></p>
                <div className="flex items-center my-4">
                    <div className="border-b-2 flex-grow border-gray-300"></div>
                    <span className="mx-4 text-gray-400">Or Sign up with</span>
                    <div className="border-b-2 flex-grow border-gray-300"></div>
                </div>
                <div className="border border-light-button w-[10rem] h-12 flex items-center justify-center rounded-md m-auto my-6 cursor-pointer">
                    <FcGoogle className="text-2xl" />
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
