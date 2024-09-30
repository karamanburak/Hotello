import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { schema, type Schema } from "../../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const RegisterForm: React.FC = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        mode: 'all',
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: Schema) => {
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-16 py-2 rounded-lg shadow-md"
        >
            <div className=" text-2xl text-center font-bold">
                Sign Up
            </div>
            <p className="my-3 text-center">
                Let’s get you all set up so you can access your personal account.
            </p>
            <div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <TextField
                        {...register("firstName")}
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        fullWidth
                        margin="normal"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message || ''}
                    />
                    <TextField
                        {...register("lastName")}
                        label="Last Name"
                        type="text"
                        placeholder="Last Name"
                        fullWidth
                        margin="normal"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message || ''}
                    />
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <TextField
                        {...register("username")}
                        label="Username"
                        type="text"
                        placeholder="Username"
                        fullWidth
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username?.message || ''}
                    />
                    <TextField
                        {...register("email")}
                        label="Email"
                        type="email"
                        placeholder="Email"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message || ''}
                    />
                </div>
                <TextField
                    {...register("password")}
                    label="Password"
                    type="password"
                    placeholder="Password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message || ''}
                />
                <TextField
                    {...register("confirmPassword")}
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    fullWidth
                    margin="normal"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message || ''}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            {...register("terms", { required: "You must accept the terms and privacy policy" })}
                            color="primary"
                        />
                    }
                    label="I agree to all the Terms and Privacy Policies"
                    className="mt-4"
                />
                {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}
                <button className="bg-light-button text-dark-text w-full py-3 my-4 rounded-md">Create account</button>
                <p className="text-center mb-6">Already have an acoount ? <span className="text-red-500 cursor-pointer" onClick={() => navigate("/login")}>Login</span></p>
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
