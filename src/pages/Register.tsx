import signUp from '../assets/signUp.png';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
    return (
        <>
            <div className='sm:flex justify-evenly items-stretch py-8 px-4 lg:px-16 font-nunito'>
                <div className='hidden md:block w-1/2 3xl:h-[60vh] xl:w-[40vw] h-[100%]'>
                    <img src={signUp} alt="sign-up image" className='w-full h-full rounded-md object-cover' />
                </div>
                <div className='w-full md:w-1/2 my-auto min-h-[400px]'>
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Register;
