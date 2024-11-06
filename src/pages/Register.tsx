import signUp from '../assets/signUp.png';
import AuthImage from '../components/auth/AuthImage';
import RegisterForm from '../components/auth/RegisterForm';
import Header from '../components/Header/Header';

const Register = () => {
    return (
        <>
            <Header />
            <div className='sm:flex justify-evenly px-4 lg:px-16 font-nunito items-stretch '>
                <AuthImage image={signUp} />
                <div className='w-full md:w-1/2 my-auto'>
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Register;
