import signUp from '../assets/signUp.png';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
    return (
        <>
            <div className='sm:flex justify-evenly items-stretch py-8 px-4 lg:px-20 font-nunito'>
                <div className='hidden md:block w-1/2 3xl:h-[60vh] xl:w-[40vw]'>
                    <img src={signUp} alt="sign-up image" className='w-full h-full rounded-md object-cover' />
                </div>
                <div className='w-full md:w-1/2 my-auto'>
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Register;
