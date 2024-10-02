import signUp from '../assets/signUp.png';
import AuthImage from '../components/auth/AuthImage';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
    return (
        <>
            <div className='sm:flex justify-evenly items-stretch px-4 lg:px-16 font-nunito'>
                <AuthImage image={signUp} />
                <div className='w-full md:w-1/2 my-auto min-h-[400px]'>
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Register;
