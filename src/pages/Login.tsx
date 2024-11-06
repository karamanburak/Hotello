import AuthImage from "../components/auth/AuthImage";
import LoginForm from "../components/auth/LoginForm";
import login from '../assets/login.png';
import Header from "../components/Header/Header";


const Login = () => {
    return (
        <>
            <Header />
            <div className='sm:flex justify-evenly items-stretch py-8 px-4 lg:px-16 font-nunito'>
                <div className='w-full md:w-1/2 my-auto min-h-[400px]'>
                    <LoginForm />
                </div>
                <AuthImage image={login} />
            </div>
        </>
    )
};

export default Login;
